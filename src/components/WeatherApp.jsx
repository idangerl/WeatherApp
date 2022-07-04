import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherApp = () => {

    const [ubication, setUbication] = useState({})
    const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const success = (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6593dd996fc8bb8bef754edb633e9d06`
        )
        .then((res) => setUbication(res.data));
    };
    navigator.geolocation.getCurrentPosition(success);
    
    console.log(ubication)
}, []);


  const changeTemperatureUnit = () => {
    if(isCelsius) {
        setIsCelsius(!isCelsius);
    } else {
        setIsCelsius(!isCelsius);
    }
}
const temperature = ubication.main?.temp;
const celsius = Math.round(temperature - 273.15);
const farenheit = Math.round((celsius * (9/5)) + 32);

  return (
    <div id="weather_wrapper">
      <div className="weatherCard">
        <div className="currentTemp">
          <span className="temp">{isCelsius ? `${celsius}°C` : `${farenheit}°F`}</span>
          <span className="location-country">{ubication.sys?.country}</span>
          <span className="location-city">{ubication.name}</span>
        </div>
        <div className="currentWeather">
          <img  className="image-time" src={`http://openweathermap.org/img/wn/${ubication.weather?.[0].icon}.png`} alt="" />
          <div className="info">
            <span className="rain">{ubication.main?.humidity} humidity</span>
            <span className="wind">{ubication.wind?.speed} MPH</span>
          </div>
        </div>
      </div>
      <button onClick={changeTemperatureUnit} className="button-change">change unit</button>
    </div>
  );
};

export default WeatherApp;
