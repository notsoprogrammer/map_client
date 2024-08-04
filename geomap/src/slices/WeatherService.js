const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

export const fetchWeatherByCoords = async (lat, lon) => {
  const response = await fetch(`${apiUrl}weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  if (!response.ok) {
    throw new Error('Failed to fetch weather');
  }
  return response.json();
};

export const fetchForecastByCoords = async (lat, lon) => {
  const response = await fetch(`${apiUrl}forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  if (!response.ok) {
    throw new Error('Failed to fetch forecast');
  }
  return response.json();
};

