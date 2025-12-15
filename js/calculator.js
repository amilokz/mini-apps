const screen = document.getElementById("calcScreen");
let expr = "";
document.querySelectorAll(".key").forEach(btn => {
  btn.onclick = () => {
    if(btn.textContent === "=") {
      try { expr = Function("return " + expr)().toString(); }
      catch { expr = ""; }
    } else { expr += btn.textContent; }
    screen.textContent = expr || "0";
  };
});
