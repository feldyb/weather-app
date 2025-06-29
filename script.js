async function getWeather(city = DEFAULT_CITY) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${UNITS}&appid=${WEATHER_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Eroare API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.error('A apărut o problemă:', error);
    showErrorMessage('Nu am putut obține datele meteo. Încearcă din nou mai târziu.');
  }
}

function displayWeather(data) {
  // Logica pentru a afișa datele meteo în pagina ta
  // Ex:
  document.getElementById('weather').textContent = `Temperatura: ${data.main.temp}°C, Vânt: ${data.wind.speed} m/s`;
}

function showErrorMessage(msg) {
  document.getElementById('error').textContent = msg;
}
