// ===== SPLASH SCREEN =====
window.addEventListener("load", () => {
  const splash = document.getElementById("splashScreen");
  if (!splash) return;

  setTimeout(() => {
    splash.style.opacity = "0";        // fade out
    setTimeout(() => splash.remove(), 600); // remove from DOM after fade
  }, 1200); // show splash for 1.2 seconds
});

// ===== Calculator =====
const screen = document.getElementById("calcScreen");
let expr = "";
document.querySelectorAll(".key").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "=") {
      try { expr = Function("return " + expr)().toString(); }
      catch { expr = ""; }
    } else { expr += btn.textContent; }
    screen.textContent = expr || "0";
  });
});

