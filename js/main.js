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

