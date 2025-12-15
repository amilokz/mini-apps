async function fetchWeatherByCity(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    const res = await fetch(url);
    if(!res.ok) throw new Error('City not found');
    const data = await res.json();
    showWeather(data);
    saveWeatherToDB(city, data); // save offline
  } catch(err) {
    const offlineData = await getWeatherFromDB(city);
    if(offlineData) {
      toast('Offline: showing last cached data');
      showWeather(offlineData);
    } else {
      toast('Weather data unavailable offline');
      document.getElementById('weatherResult').classList.add('d-none');
    }
  }
}

function showWeather(data) {
  const icon = data.weather && data.weather[0] ? data.weather[0].icon : '';
  elIcon.src = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : '/icons/icon-192.png';
  result.classList.remove('d-none');
}
