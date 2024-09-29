
// src/components/WeatherDisplay.jsx
import React from 'react';
import { CiCloudSun } from 'react-icons/ci';
import { FaCloudSunRain, FaSun, FaCloud, FaSnowflake, FaCloudRain } from 'react-icons/fa';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const {
    name,
    weather,
    main: { temp, humidity, pressure },
    wind: { speed },
    sys: { sunset, sunrise, country }, // Extract sunrise here
    timezone,
  } = weatherData;

  // Convert sunset and sunrise times from UNIX to a readable format based on the city's timezone
  const sunsetDate = new Date((sunset + timezone) * 1000);
  const sunsetTime = sunsetDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  const sunriseDate = new Date((sunrise + timezone) * 1000); // Convert sunrise
  const sunriseTime = sunriseDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // Format sunrise

  // Function to determine which icon to display based on weather description and temperature
  const getWeatherIcon = (description, temp) => {
    if (description.includes('clear')) {
      return <FaSun aria-label="Clear weather" />;
    } else if (description.includes('rain') && description.includes('cloud')) {
      return <FaCloudSunRain aria-label="Rainy weather with sun" />;
    } else if (description.includes('rain')) {
      return <FaCloudRain aria-label="Rainy weather" />;
    } else if (description.includes('cloud')) {
      return <FaCloud aria-label="Cloudy weather" />;
    } else if (description.includes('snow')) {
      return <FaSnowflake aria-label="Snowy weather" />;
    } else if (description.includes('thunderstorm')) {
      return <FaCloudSunRain aria-label="Thunderstorm" />;
    } else if (description.includes('mist') || description.includes('fog')) {
      return <CiCloudSun aria-label="Foggy weather" />;
    } else if (temp > 30) {
      return <FaSun aria-label="Hot weather" />;
    } else {
      return <CiCloudSun aria-label="Partly cloudy weather" />;
    }
  };

  return (
    <div className="mt-8 flex flex-col justify-center w-80 p-4">
      <div className=" flex justify-center text-8xl mb-2 text-white">
        {getWeatherIcon(weather[0].description, temp)}
      </div>
      <h2 className="text-4xl font-bold text-white">{name}, {country}</h2>
      <p className="text-6xl text-white">{Math.round(temp)}°C</p>
      <p className="text-xl capitalize text-white">{weather[0].description}</p>
      <div className="text-lg flex flex-col gap-8 mt-8">
        <div className='flex justify-between'>
          <div>
            <p className='text-slate-500'>Humidity</p>
            <p className='text-white font-semibold text-2xl'>{humidity}%</p>
          </div>
          <div>
            <p className='text-slate-500'>Pressure</p>
            <p className='text-white font-semibold text-2xl'>{pressure} hPa</p>
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <p className='text-slate-500'>Wind Speed</p>
          <p className='text-white font-semibold text-2xl'>{speed} m/s</p>
        </div>
        {/* <p>Sunrise: {sunriseTime}</p> 
        <p>Sunset: {sunsetTime}</p> */}
      </div>
    </div>
  );
};

export default WeatherDisplay;
