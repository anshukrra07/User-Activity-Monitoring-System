import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AccessController from "./AccessController.jsx";

export default function AISurveillanceScreen() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking animation trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const eyeOffsetX = mouse.x * 20;
  const eyeOffsetY = mouse.y * 20;

  return (
    <div style={styles.container}>
      {/* Grid background */}
      <div style={styles.grid} />
      <AccessController/>


      {/* Scanning line */}
      <motion.div
        style={styles.scanLine}
        animate={{ top: ["-20%", "120%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Warning text */}
      <div style={styles.warning}>YOU ARE BEING WATCHED</div>

      {/* AI FACE */}
      <div style={styles.faceContainer}>
        {/* LEFT EYE */}
        <div style={styles.eye}>
          <motion.div
            style={{
              ...styles.pupil,
              transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px) scaleY(${
                blink ? 0.1 : 1
              })`,
            }}
          />
        </div>

        {/* RIGHT EYE */}
        <div style={styles.eye}>
          <motion.div
            style={{
              ...styles.pupil,
              transform: `translate(${eyeOffsetX}px, ${eyeOffsetY}px) scaleY(${
                blink ? 0.1 : 1
              })`,
            }}
          />
        </div>
      </div>

      {/* Button */}
      <button
  style={styles.button}
  onClick={() => navigate("/DashboardGuide")}
>
  ENTER CONTROL DASHBOARD →
</button>
    </div>
    
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  container: {
    position: "fixed",
    inset: 0,
    background: "radial-gradient(circle at center, #05080d, #000)",
    overflow: "hidden",
    fontFamily: "monospace",
    color: "#00ffcc",
  },

  grid: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0,255,204,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,204,0.05) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
  },

  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: "2px",
    background: "linear-gradient(90deg, transparent, #00ffcc, transparent)",
    opacity: 0.6,
  },

  warning: {
    position: "absolute",
    top: "8%",
    width: "100%",
    textAlign: "center",
    fontSize: "32px",
    letterSpacing: "4px",
    textShadow: "0 0 12px rgba(0,255,204,0.8)",
  },

  faceContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    gap: "80px",
  },

  eye: {
    width: "120px",
    height: "80px",
    borderRadius: "50%",
    background: "radial-gradient(circle at center, #0ff, #022)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 30px rgba(0,255,204,0.6)",
    overflow: "hidden",
  },

  pupil: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "#000",
    boxShadow: "0 0 10px rgba(0,0,0,0.8)",
    transition: "transform 0.1s linear",
  },

  button: {
    position: "absolute",
    bottom: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "14px 32px",
    fontSize: "16px",
    background: "transparent",
    color: "#00ffcc",
    border: "2px solid #00ffcc",
    cursor: "pointer",
    letterSpacing: "2px",
    boxShadow: "0 0 15px rgba(0,255,204,0.5)",
  },
};