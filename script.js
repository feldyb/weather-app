async function getWeather(city = DEFAULT_CITY) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${UNITS}&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Eroare API: ${response.status}`);
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('Eroare:', error);
    showErrorMessage('Nu am putut obține datele. Verifică orașul sau încearcă mai târziu.');
  }
}

function displayWeather(data) {
  const weatherDiv = document.getElementById('weather');
  const errorDiv = document.getElementById('error');
  errorDiv.textContent = ''; // Șterge eventualele erori

  const temp = data.main.temp;
  const wind = data.wind.speed;
  const desc = data.weather[0].description;

  weatherDiv.innerHTML = `
    <p><strong>Oraș:</strong> ${data.name}</p>
    <p><strong>Temperatură:</strong> ${temp}°C</p>
    <p><strong>Vânt:</strong> ${wind} m/s</p>
    <p><strong>Descriere:</strong> ${desc}</p>
  `;
}

function showErrorMessage(msg) {
  document.getElementById('weather').textContent = '';
  document.getElementById('error').textContent = msg;
}

function searchWeather() {
  const city = document.getElementById('cityInput').value;
  if (city.trim() !== '') {
    getWeather(city.trim());
  } else {
    showErrorMessage('Te rugăm să introduci un oraș.');
  }
}

// Afișează vremea implicită la încărcarea paginii
window.onload = () => {
  getWeather();
};
