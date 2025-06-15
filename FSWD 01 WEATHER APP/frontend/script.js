const BACKEND_URL = 'http://localhost:5000/api/weather';

async function fetchWeatherData(city = 'London', lat = null, lon = null) {
  let query = city ? `city=${city}` : `lat=${lat}&lon=${lon}`;
  const url = `${BACKEND_URL}?${query}`;

  const output = document.getElementById('output');
  const spinner = document.getElementById('spinner');

  output.innerHTML = '';
  spinner.style.display = 'block';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const weatherData = await response.json();
    displayWeather(weatherData);
  } catch (error) {
    console.error('Fetch Error:', error);
    output.innerHTML = `<p style="color:red; text-align:center;">❌ Unable to load weather data. Please try again later.</p>`;
  } finally {
    spinner.style.display = 'none';
  }
}

function displayWeather(data) {
  const output = document.getElementById('output');

  const city = document.createElement('h2');
  city.textContent = `Weather in ${data.name}, ${data.sys.country}`;

  const temp = document.createElement('p');
  temp.textContent = `Temperature: ${data.main.temp} °C`;

  const desc = document.createElement('p');
  desc.textContent = `Condition: ${data.weather[0].description}`;

  const humidity = document.createElement('p');
  humidity.textContent = `Humidity: ${data.main.humidity}%`;

  const wind = document.createElement('p');
  wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

  output.appendChild(city);
  output.appendChild(temp);
  output.appendChild(desc);
  output.appendChild(humidity);
  output.appendChild(wind);
}

function searchCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (city) {
    fetchWeatherData(city);
  } else {
    alert("Please enter a city name.");
  }
}

window.addEventListener('DOMContentLoaded', () => {
  fetchWeatherData(); // Default: London
});
