import React from 'react';
import './Weather.css'
import {
  WiDaySunny, WiCloudy, WiDayHaze, WiDayHail, WiDayFog, WiTornado, WiDust, WiFog, WiSnow, WiRain,
  WiDayRainMix, WiDayThunderstorm
} from 'react-icons/wi';
import { TiDelete } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStoredCity } from '../../Store/Actions/Weather';


const SingleCityWeather = (props) => {
  const { weather } = props
  const dispatch = useDispatch()

  const delete_City = () => {
    dispatch(deleteStoredCity(weather._id))
  }

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "Clouds":
        return <WiCloudy />;
      case "Clear":
        return <WiDaySunny />;
      case "Haze":
        return <WiDayHaze />;
      case "Hail":
        return <WiDayHail />;
      case "Fog":
        return <WiDayFog />;
      case "Tornado":
        return <WiTornado />;
      case "Dust":
        return <WiDust />;
      case "Mist":
        return <WiFog />;
      case "Snow":
        return <WiSnow />;
      case "Rain":
        return <WiRain />;
      case "Drizzle":
        return <WiDayRainMix />;
      case "Thunderstorm":
        return <WiDayThunderstorm />;
      default:
        return <WiDaySunny />;
    }
  }
  let icon = (<></>)
  if (typeof weather.main != "undefined") {
    icon = getWeatherIcon(weather.main);
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div>
      {(typeof weather.main != "undefined") ? (
        <div>
          <div className='weather-box'>
            <TiDelete className='delete-btn' onClick={delete_City} />
            <div className='location-box'>
              <div className='location'>
                <Link className='link' to={`/weather/${weather.name}`} >
                  {weather.name}, {weather.sys.country}
                </Link>
              </div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather'>{icon}</div>
            <div className='temp'>
              <p>
                Current: {Math.round(weather.main.temp)}°c
              </p>
              <p>
                Min: {Math.round(weather.main.temp_min)}°c
              </p>
              <p>
                Max: {Math.round(weather.main.temp_max)}°c
              </p>
            </div>
          </div>
        </div>
      ) : ('')}
    </div >
  )
};

export default SingleCityWeather;