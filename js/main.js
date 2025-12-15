// ===== Splash Screen (FORCED REMOVE) =====
window.addEventListener("load", () => {
  const splash = document.getElementById("splashScreen");

  if (!splash) return;

  setTimeout(() => {
    splash.style.transition = "opacity 0.6s ease";
    splash.style.opacity = "0";

    setTimeout(() => {
      splash.remove(); // 🔥 remove from DOM completely
    }, 600);
  }, 1000);
});

// ===== Toast =====
function toast(msg, delay = 3000) {
  const el = document.createElement("div");
  el.className = "toast align-items-center text-white bg-dark border-0";
  el.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${msg}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto"></button>
    </div>`;
  document.body.appendChild(el);
  const bs = new bootstrap.Toast(el, { delay });
  bs.show();
  el.addEventListener("hidden.bs.toast", () => el.remove());
}

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
        toast("Invalid calculation");
      }
    } else {
      expr += btn.textContent;
    }
    screen.textContent = expr || "0";
  });
});
