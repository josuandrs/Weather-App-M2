import { useState, useEffect } from 'react';
import './App.css';
import search_icon from '../public/search_icon.png';
import LightCloud from '../public/LightCloud.png'
import Shower from '../public/Shower.png'
import Thunderstorm from '../public/Thunderstorm.png'
import Hora from './Hora';


const App = () => {
  const apiKey = "cbf7755681f17252d68bc9ab2bc502be";
  const [weatherData, setWeatherData] = useState({
    humidity: "",
    windSpeed: "",
    temperature: "",
    location: "",
    visibility: "",
    pressure: "",
    
  });
  const [forecastData, setForecastData] = useState([]);
  

  const NavBar =() => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const toggleSidebar = (e) => {
    e.preventDefault();
    setSidebarVisible(!sidebarVisible);
    }
    return(
      <div className="navbar">
        <button className="t-btn" onClick={toggleSidebar}>Search for place</button>
        
        <div className={`search-sidebar ${sidebarVisible ? "visible" : ""}`}>
            <div className="sidebar-content">
              <input className="cityInput" type="text" placeholder="Search location" />
              <button className="btn" onClick={search} >Search</button>
            </div>
          <button className="close-button" onClick={toggleSidebar}>
            Close
          </button>
        </div>
      </div>
    )
  };
 
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
        pressure: data.main.pressure,
        
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
        <div className='headSection1'>
          <NavBar />
          <button className="gps"><i class='bx bx-current-location'></i></button>
        </div>
        <div className='headSection2'>
          <div className="icon"> 
            <img src={getWeatherImage(weatherData.temperature)} alt="Weather" />
          </div>
        </div>
        <div className='headSection3'>{Math.floor(weatherData.temperature)}°C</div>
        <Hora />
        <div className='headSection6'><i class='bx bxs-map'></i> {weatherData.location}</div>
      </div>
      <div className='main'>
        <div className='mainUp'>
          <div className='mainUp1'>
            <div className='mainUps'>°C</div>
            <div className='mainUps'>°F</div>
          </div>
          <div className='mainUp2'>
            {forecastData.map((forecastItem, index) => (
              <div className='bloque' key={index}>
                <div className='bloqueMainUp2'>Fecha</div>
                <img src={getWeatherImage(forecastItem.main.temp)} alt="Weather" />
                {forecastItem.main.temp}°C
              </div>
            ))}
          </div>
        </div>
        <div className='mainDown'>
          <h1>Today’s Highlights</h1>
          <div className='mainDownBloques'>
            <div className='bloque1'><span>Wind status:</span> 
              <div className='subBloque'>
                {weatherData.windSpeed} <span>mph</span>
              </div> 
            </div>
            <div className='bloque13'><span>Humidity: </span>
              <div className='subBloque'>
                {weatherData.humidity} <span>%</span>
              </div>
            </div>
            <div className='bloque2'><span>Visibility:</span> 
              <div className='subBloque'>
                {weatherData.visibility} <span>miles</span>
              </div>
            </div>
            <div className='bloque2'><span>Air Pressure:</span> 
              <div className='subBloque'>
                {weatherData.pressure} <span>mb</span>
              </div>
            </div>
          </div>
        </div>
        <div className='mainFoter'><small>created by<u><strong> josuandrs</strong></u> - devChallenges.io</small></div>
      </div>
    </div>
  );
};

export default App;