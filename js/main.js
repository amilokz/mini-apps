

// ===== TODO APP =====
document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.getElementById("todoForm");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const taskEl = document.createElement("div");
      taskEl.className = "task d-flex justify-content-between align-items-center";
      taskEl.innerHTML = `
        <span>${task}</span>
        <button class="btn btn-sm btn-danger">Delete</button>
      `;
      taskEl.querySelector("button").addEventListener("click", () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
        toast("Task deleted!");
      });
      taskList.appendChild(taskEl);
    });
  }

  todoForm.addEventListener("submit", e => {
    e.preventDefault();
    const value = taskInput.value.trim();
    if (!value) return;
    tasks.push(value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
    toast("Task added!");
  });

  renderTasks();
});

// ===== WEATHER APP =====
document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("cityInput");
  const weatherBtn = document.getElementById("weatherBtn");
  const weatherResult = document.getElementById("weatherResult");

  const OPENWEATHER_API_KEY = "14d36b95fec4605d7387fbd001d588e6";

  async function fetchWeather(city) {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      showWeather(data);
      localStorage.setItem("lastCity", city);
    } catch {
      toast("Weather data unavailable");
      weatherResult.classList.add("d-none");
    }
  }

  function showWeather(data) {
    weatherResult.classList.remove("d-none");
    weatherResult.innerHTML = `
      <div class="d-flex align-items-center gap-2">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" width="60" height="60" alt="icon">
        <div>
          <div><strong>${data.name}</strong></div>
          <div>${data.weather[0].description}</div>
          <div>🌡 ${data.main.temp}°C | 💧 ${data.main.humidity}% | 🌬 ${data.wind.speed} m/s</div>
        </div>
      </div>
    `;
  }

  weatherBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) return toast("Enter a city name");
    fetchWeather(city);
  });

  cityInput.addEventListener("keyup", e => {
    if (e.key === "Enter") weatherBtn.click();
  });

  const lastCity = localStorage.getItem("lastCity");
  if (lastCity) {
    cityInput.value = lastCity;
    fetchWeather(lastCity);
  }
});

// ===== CALCULATOR =====
document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("calcScreen");
  let expr = "";

  document.querySelectorAll(".key").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.textContent === "=") {
        try { expr = Function("return " + expr)().toString(); }
        catch { expr = ""; toast("Invalid calculation"); }
      } else {
        expr += btn.textContent;
      }
      screen.textContent = expr || "0";
    });
  });
});

// ===== TOAST FUNCTION =====
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
