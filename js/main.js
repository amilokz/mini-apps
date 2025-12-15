// ===== Splash Screen Control =====
window.addEventListener("load", () => {
  const splash = document.getElementById("splashScreen");
  const app = document.getElementById("appContent");

  if (!splash || !app) return;

  setTimeout(() => {
    splash.style.transition = "opacity 0.6s ease";
    splash.style.opacity = "0";

    setTimeout(() => {
      splash.remove();
      app.style.display = "block";
    }, 600);
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
