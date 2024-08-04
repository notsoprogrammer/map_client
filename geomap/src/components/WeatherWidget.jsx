import React, { useState, useEffect } from 'react';
import { fetchForecastByCoords, fetchWeatherByCoords } from '../slices/WeatherService';
import styles from './WeatherWidget.module.css';
import humidity from '../assets/humidity.png';
import wind from '../assets/wind.png';
const WeatherWidget = ({ coords }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [location, setLocation] = useState('');

  useEffect(() => {
    if (coords) {
      fetchWeatherByCoords(coords.latitude, coords.longitude)
        .then(data => {
          setLocation(data?.name); 

          setWeatherData({
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].description, 
            humidity: data.main.humidity,
            wind: data.wind.speed,
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            day: new Date(data.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
            date: new Date(data.dt * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          });
        })
        .catch(console.error);

      fetchForecastByCoords(coords.latitude, coords.longitude)
        .then(data => {
          const dailyForecasts = data.list.filter((reading) => reading.dt_txt.endsWith("12:00:00"));
          // Set the forecast data using the processed data from the response
          setForecastData(dailyForecasts.slice(0, 5).map(day => ({
            day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }),
            minTemp: Math.round(day.main.temp_min),
            maxTemp: Math.round(day.main.temp_max),
            icon: `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`,
            condition: day.weather[0].main, // This could be description as well, if more detail is desired
          })));
        })
        .catch(console.error);
    }
  }, [coords]);
  if (!weatherData || forecastData.length === 0) {
    return <div>Loading...</div>; 
  }

  if (!weatherData || forecastData.length === 0) {
    return <div>Loading...</div>; 
  }

  return (
    <div className={styles.weatherWidget}>
      <div className={styles.currentWeatherSection}>
        <div className={styles.locationTitle}>Weather Update for {location}</div>
        <div className={styles.currentWeather}>
          <div className={styles.date}>{weatherData.day}, {weatherData.date}</div>
          <div className={styles.iconAndTemp}>
            <img src={weatherData.icon} alt="Current Weather" className={styles.weatherIcon} />
            <div className={styles.temperature}>{weatherData.temperature}°C</div>
          </div>
          <div className={styles.condition}>{weatherData.condition}</div>
        </div>
      </div>
      <div className={styles.detailsAndForecast}>
      <div className={styles.details}>
        <div>
          <img src={humidity} alt="Humidity Icon" className={styles.icon} />
          <span className={styles.detailLabel}>HUMIDITY</span>
          <span>{weatherData.humidity}%</span>
        </div>
        <div>
          <img src={wind} alt="Wind Icon" className={styles.icon} />
          <span className={styles.detailLabel}>WIND</span>
          <span>{weatherData.wind} m/s</span>
        </div>
      </div>
        <div className={styles.weeklyForecast}>
          {forecastData.map((forecast, index) => (
            <div key={index} className={styles.forecastCard}>
              <div className={styles.forecastDay}>{forecast.day}</div>
              <div className={styles.forecastTemp}>{`${forecast.minTemp}°C / ${forecast.maxTemp}°C`}</div>
              
              <img src={forecast.icon} alt={forecast.condition} className={styles.forecastIcon} />
              <div className={styles.forecastCondition}>{forecast.condition}</div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default WeatherWidget;