const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const searchBtn = document.getElementById('searchBtn');
const geoBtn = document.getElementById('geoBtn');
const cityInput = document.getElementById('cityInput');
const historyEl = document.getElementById('history');

searchBtn.addEventListener('click', () => getWeatherByCity(cityInput.value));
geoBtn.addEventListener('click', getWeatherByLocation);

function getWeatherByCity(city) {
  if (!city) return;
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
  saveToHistory(city);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    });
  }
}

function fetchWeather(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => updateUI(data));
}

function updateUI(data) {
  document.getElementById('cityName').textContent = data.name;
  document.getElementById('description').textContent = data.weather[0].description;
  document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  document.getElementById('temperature').textContent = `Temperatura: ${data.main.temp}°C`;
  document.getElementById('feelsLike').textContent = `Se simte ca: ${data.main.feels_like}°C`;

  document.getElementById('humidity').textContent = `Umiditate: ${data.main.humidity}%`;
  document.getElementById('pressure').textContent = `Presiune: ${data.main.pressure} hPa`;
  document.getElementById('windSpeed').textContent = `Vânt: ${data.wind.speed} m/s`;
  document.getElementById('visibility').textContent = `Vizibilitate: ${data.visibility / 1000} km`;

  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
  document.getElementById('sunrise').textContent = `Răsărit: ${sunrise}`;
  document.getElementById('sunset').textContent = `Apus: ${sunset}`;

  document.getElementById('weatherInfo').classList.remove('hidden');
}

function saveToHistory(city) {
  let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
  if (!history.includes(city)) {
    history.unshift(city);
    if (history.length > 5) history.pop();
    localStorage.setItem('weatherHistory', JSON.stringify(history));
    renderHistory();
  }
}

function renderHistory() {
  const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
  historyEl.innerHTML = '';
  history.forEach(city => {
    const li = document.createElement('li');
    li.textContent = city;
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => getWeatherByCity(city));
    historyEl.appendChild(li);
  });
}

renderHistory();
