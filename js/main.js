// ===== SPLASH SCREEN =====
window.addEventListener("load", () => {
  const splash = document.getElementById("splashScreen");
  if (!splash) return;

  // Show splash for 1.2s
  setTimeout(() => {
    splash.style.opacity = "0"; // fade out

    // remove splash & show main content
    setTimeout(() => {
      splash.remove();
      document.body.classList.add("loaded"); // fade in main
    }, 600); // match CSS fade duration
  }, 1200);
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

// ===== IndexedDB for Todo & Weather =====
let db;
const request = indexedDB.open('MiniAppsDB', 1);

request.onupgradeneeded = e => {
  db = e.target.result;
  if (!db.objectStoreNames.contains('tasks'))
    db.createObjectStore('tasks', { keyPath: 'id', autoIncrement:true });
  if (!db.objectStoreNames.contains('weather'))
    db.createObjectStore('weather', { keyPath: 'city' });
};

request.onsuccess = e => db = e.target.result;
request.onerror = e => console.error('IndexedDB error', e);

window.db = db;
window.saveTaskToDB = function(task) {
  if (!db) return;
  const tx = db.transaction('tasks', 'readwrite');
  tx.objectStore('tasks').put({ task, id: Date.now() });
};
window.saveWeatherToDB = function(city, data) {
  if (!db) return;
  const tx = db.transaction('weather', 'readwrite');
  tx.objectStore('weather').put({ city, data, time: Date.now() });
};
window.getWeatherFromDB = function(city) {
  return new Promise((resolve, reject) => {
    if (!db) return resolve(null);
    const tx = db.transaction('weather', 'readonly');
    const req = tx.objectStore('weather').get(city);
    req.onsuccess = () => resolve(req.result?.data || null);
    req.onerror = () => reject(null);
  });
};

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
        window.toast('Task deleted!');
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
    window.saveTaskToDB(value); // save in IndexedDB
    taskInput.value = "";
    renderTasks();
    window.toast('Task added!');
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
      window.saveWeatherToDB(city, data);
      localStorage.setItem("lastCity", city);
    } catch {
      const offlineData = await window.getWeatherFromDB(city);
      if (offlineData) {
        window.toast("Offline: showing last cached data");
        showWeather(offlineData);
      } else {
        window.toast("Weather data unavailable");
        weatherResult.classList.add("d-none");
      }
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
    if (!city) return window.toast("Enter a city name");
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
        catch { expr = ""; window.toast("Invalid calculation"); }
      } else { expr += btn.textContent; }
      screen.textContent = expr || "0";
    });
  });
});
