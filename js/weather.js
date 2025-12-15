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
