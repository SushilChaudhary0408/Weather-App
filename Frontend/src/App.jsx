
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

const App = () => {
  const [city, setCity] = useState('Kathmandu'); // Default city to Kathmandu
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    // Validate the input
    if (!city.trim()) {
      toast.error('Please enter a valid city');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/weather?city=${city}`);
      setWeatherData(response.data);
      toast.success('Weather data fetched successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch weather data';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city); // Fetch weather for Kathmandu on mount
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b flex flex-col items-center">
      <div className='flex flex-col items-center min-h-screen w-80 bg-gradient-to-b from-[#EC9826] via-[#4D4B73] to-[#0E101C] rounded-lg shadow-lg'>
        <Toaster />
        <Header />
        <SearchBar setCity={setCity} fetchWeather={() => fetchWeather(city)} />
        {loading && <p className="text-xl text-gray-700">Loading...</p>}
        <WeatherDisplay weatherData={weatherData} />
      </div>
    </div>
  );
};

export default App;

