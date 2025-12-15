const cityInput = document.getElementById("cityInput");
const weatherBtn = document.getElementById("weatherBtn");
const weatherResult = document.getElementById("weatherResult");

const OPENWEATHER_API_KEY = "14d36b95fec4605d7387fbd001d588e6"; // <- Put your API key here

// Elements for showing data
const elIcon = document.createElement("img");
elIcon.style.width = "60px";
elIcon.style.height = "60px";
weatherResult.appendChild(elIcon);

// Show toast function (from main.js)
function toast(msg, delay = 3000) {
  const id = 't' + Date.now();
  const el = document.createElement('div');
  el.className = 'toast align-items-center text-white bg-dark border-0';
  el.role = 'alert';
  el.id = id;
  el.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${msg}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>`;
  document.body.appendChild(el);
  const bs = new bootstrap.Toast(el, { delay });
  bs.show();
  el.addEventListener('hidden.bs.toast', () => el.remove());
}

// Fetch weather
async function fetchWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();
    showWeather(data);
    saveWeatherToDB(city, data); // offline save
  } catch (err) {
    // Try offline data
    const offlineData = await getWeatherFromDB(city);
    if (offlineData) {
      toast("Offline: showing last cached data");
      showWeather(offlineData);
    } else {
      toast("Weather data unavailable");
      weatherResult.classList.add("d-none");
    }
  }
}

// Show weather data
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

// Button click
weatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) return toast("Enter a city name");
  fetchWeather(city);
});

// Optional: press Enter to search
cityInput.addEventListener("keyup", e => {
  if (e.key === "Enter") weatherBtn.click();
});

// Load last searched city on page load
window.addEventListener("load", async () => {
  const lastCity = cityInput.value.trim();
  if (lastCity) fetchWeather(lastCity);
});
