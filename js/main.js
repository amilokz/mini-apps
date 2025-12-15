// ===== Splash Screen Control =====
window.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splashScreen");
  const app = document.getElementById("appContent");

  if (!splash || !app) return;

  // Force hide app (extra safety)
  app.style.display = "none";

  // Show splash for 1 second
  setTimeout(() => {
    splash.style.opacity = "0";
    splash.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      splash.remove();
      app.style.display = "block"; // 👈 show app ONLY now
    }, 500);
  }, 1000);
});


// ===== Calculator =====
const screen = document.getElementById("calcScreen");
let expr = "";

document.querySelectorAll(".key").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "=") {
      try {
        expr = Function("return " + expr)().toString();
      } catch {
        expr = "";
      }
    } else {
      expr += btn.textContent;
    }
    screen.textContent = expr || "0";
  });
});
