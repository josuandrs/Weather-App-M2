import { useState, useEffect } from 'react';
import './App.css';
import search_icon from '../public/search_icon.png';
import LightCloud from '../public/LightCloud.png'
import Shower from '../public/Shower.png'
import Thunderstorm from '../public/Thunderstorm.png'

const App = () => {
  const apiKey = "cbf7755681f17252d68bc9ab2bc502be";
  const [weatherData, setWeatherData] = useState({
    humidity: "",
    windSpeed: "",
    temperature: "",
    location: "",
    visibility: "",
    pressure: ""
  });
  const [forecastData, setForecastData] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherImage = (temperature) => {
    if (temperature < 10) {
      return Thunderstorm; //FRIO
    } else if (temperature >= 10 && temperature < 20) {
      return Shower; // CALIDO
    } else {
      return LightCloud; // CALOR
    }
  };
  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: data.main.temp,
        location: data.name,
        visibility: data.visibility,
        pressure: data.main.pressure
      });

      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${element[0].value}&units=metric&appid=${apiKey}`;
      const forecastResponse = await fetch(forecastUrl);
      const forecastData = await forecastResponse.json();
      const upcomingForecast = forecastData.list.slice(1, 6);

      setForecastData(upcomingForecast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div className='ctn'>
      <div className='head'>
        <div className='headSection'>
          <input type="text" className='cityInput' placeholder='Busqueda' />
          <div className='search-icon' onClick={search}>
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className='headSection'>icono</div>
        <img src={getWeatherImage(weatherData.temperature)} alt="Weather" />
        <div className='headSection'>{weatherData.temperature}°C</div>
        <div className='headSection'>{currentDateTime.toLocaleTimeString()}</div>
        <div className='headSection'>{currentDateTime.toLocaleDateString()}</div>
        <div className='headSection'>{weatherData.location}</div>
      </div>
      <div className='main'>
        <div className='mainUp'>
          <div className='mainUp1'>{weatherData.temperature}°C</div>
          <div className='mainUp2'>
            {forecastData.map((forecastItem, index) => (
              <div className='bloque' key={index}>
                {forecastItem.main.temp}°C
                <img src={getWeatherImage(forecastItem.main.temp)} alt="Weather" />
              </div>
            ))}
          </div>
        </div>
        <div className='mainDown'>
          <h1>Today’s Highlights</h1>
          <div className='mainDownBloques'>
            <div className='bloque1'>Wind status: {weatherData.windSpeed}</div>
            <div className='bloque13'>Humidity: {weatherData.humidity}</div>
            <div className='bloque2'>Visibility: {weatherData.visibility}</div>
            <div className='bloque2'>Air Pressure: {weatherData.pressure}</div>
          </div>
        </div>
        <div className='mainFoter'>username</div>
      </div>
    </div>
  );
};

export default App;