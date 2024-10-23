import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search from '../assets/search.png'
import clear from '../assets/clear.png'
import clouds from '../assets/clouds.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import mist from '../assets/mist.png'
import rain from '../assets/rain.png'
import snow_icon from '../assets/snow_icon.png'
import wind from '../assets/wind.png'

const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": clouds,
    "02n": clouds,
    "03d": drizzle, //clouds
    "03n": drizzle, //clouds
    "04d": clouds, //
    "04n": clouds,
    "09d": drizzle,
    "09n": drizzle,
    "10d": rain,
    "10n": rain,
    "11d": rain,
    "11n": rain,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist,
    "50n": mist
  }

  const searchField = async (city) => {

    if (city === "") {
      alert("Please Enter city name");
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`; // In VITE, we need to use VITE_variable_name for storing in '.env';

      const response = await fetch(url);

      const data = await response.json();

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
    } catch(error) {
      setWeatherData(false);
      console.error("Error in fetching the data");
    }
  }

  useEffect(() => {
    searchField();
  }, [])

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Enter City Name' />
        <img src={search} alt="search-icon" onClick={() => searchField(inputRef.current.value)} />
      </div>

      {weatherData ? <>
        <img src={weatherData.icon} alt="weather-icon" className='weather-icon' />
        <p className='temp'>{weatherData.temperature}°C</p>
        <p className='city'>{weatherData.location}</p>

        <div className="weather-data">
          <div className="col">
            <img src={humidity} alt="humidity-icon" />
            <div>
              <p>{weatherData.humidity}%</p>
              <span>humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={wind} alt="wind-icon" />
            <div>
              <p>{weatherData.windSpeed}kmph</p>
              <span>Wind</span>
            </div>
          </div>
        </div>
      </> : <></>}


    </div>
  )
}

export default Weather