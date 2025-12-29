import { useState } from "react";

export default function DashboardGuide() {
  const [step, setStep] = useState(0);

  const steps = [
  {
    title: "Active Users",
    text: "Shows users active in the last few minutes using anonymous session IDs.",
    highlight: { top: "25%", left: "20%", width: "60%", height: "8%" },
  },
  {
    title: "Trigger Controls",
    text: "Admins can manually trigger camera, audio, or capture events.",
    highlight: { top: "11%", left: "8%", width: "84%", height: "15%" },
  },
  {
    title: "Captured Logs",
    text: "Displays stored images, videos, timestamps, and metadata.",
    highlight: { top: "55%", left: "18%", width: "64%", height: "34%" },
  },
  {
    title: "Activity Map",
    text: "This map visualizes approximate user activity regions. Exact locations are never stored or displayed.",
    highlight: { top: "87%", left: "18%", width: "64%", height: "20%" },
  },
  {
    title: "Security & Privacy Model",
    text: "All monitoring follows strict security rules. Real dashboards are intentionally hidden in this demo.",
    highlight: null,
  },
];

  const current = steps[step];

  return (
    <div style={styles.container}>
      {/* Dashboard Screenshot */}
      <div style={styles.backgroundImage} />
<style>
{`
@keyframes scrollLeft {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
`}
</style>
      {/* Dark Overlay */}
      <div style={styles.overlay} />
      {/* Security Disclaimer */}
{/* Moving Security Disclaimer */}
<div style={styles.disclaimerWrapper}>
  <div style={styles.disclaimerText}>
    🔒 For security & privacy reasons, the real dashboard, live feeds, and internal APIs are not shared.
    This tutorial demonstrates functionality using a static preview only.
  </div>
</div>


      {/* Highlight Box */}
      {current.highlight && (
        <div
          style={{
            ...styles.highlight,
            ...current.highlight,
          }}
        />
      )}

      {/* Tooltip */}
      <div style={styles.tooltip}>
        <h3>{current.title}</h3>
        <p>{current.text}</p>

        <div style={styles.actions}>
          <button
            onClick={() => window.history.back()}
            style={styles.secondaryBtn}
          >
            Exit
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              style={styles.primaryBtn}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => window.history.back()}
              style={styles.primaryBtn}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "fixed",
    inset: 0,
    
    background: "#000000ff",
    fontFamily: "system-ui, sans-serif",
  },


backgroundImage: {
  position: "absolute",
  inset: 0,
  backgroundImage: 'url("/dashboard-preview.png")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  pointerEvents: "none",
},
  
disclaimer: {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  padding: "10px 16px",
  background: "rgba(0,0,0,0.85)",
  color: "#00ffcc",
  fontSize: "14px",
  textAlign: "center",
  zIndex: 10000,
  letterSpacing: "0.5px",
},

disclaimerWrapper: {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  overflow: "hidden",
  background: "rgba(0,0,0,0.9)",
  zIndex: 10000,
  height: "36px",
},

disclaimerText: {
  whiteSpace: "nowrap",
  display: "inline-block",
  paddingLeft: "100%",
  color: "#00ffcc",
  fontSize: "14px",
  lineHeight: "36px",
  fontWeight: "500",
  animation: "scrollLeft 20s linear infinite",
},

  

tooltip: {
  position: "fixed",          // ⬅ important
  bottom: "40px",
  left: "50%",
  transform: "translateX(-50%)",
  background: "#ffffff",
  color: "#111",              // ⬅ force visible text
  padding: "20px",
  borderRadius: "12px",
  width: "420px",
  zIndex: 9999,               // ⬅ VERY important
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
},
overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    zIndex: 1,
  },

  highlight: {
    position: "absolute",
    border: "3px solid #00ffcc",
    borderRadius: "8px",
    boxShadow: "0 0 25px rgba(0,255,204,0.9)",
    zIndex: 2,
    pointerEvents: "none",
  },

  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },

  primaryBtn: {
    background: "#00ffcc",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },

secondaryBtn: {
  background: "transparent",
  border: "1px solid #666",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  color: "#111",          // ✅ ADD THIS
  fontWeight: "500",
},
};