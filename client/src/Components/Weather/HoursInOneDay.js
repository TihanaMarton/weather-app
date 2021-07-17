import React from 'react';
import './Weather.css';
import {
  WiDaySunny, WiCloudy, WiDayHaze, WiDayHail, WiDayFog, WiTornado, WiDust, WiFog, WiSnow, WiRain,
  WiDayRainMix, WiDayThunderstorm
} from 'react-icons/wi'


const HourTable = (props) => {
  const { weather } = props

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
  if (typeof weather.weather != "undefined") {
    icon = getWeatherIcon(weather.weather[0].main);
  }
  const dateBuilder = (d) => {

    let hours = d.getHours();

    return `${hours}:00`
  }
  return (
    <>
      <tr>
        <td className='hour-style'>{dateBuilder(new Date(weather.dt * 1000))}</td>
        <td className='icon-style'>{icon}</td>
        <td className='temp-style'>{Math.round(weather.temp)}°c </td>
      </tr>
    </>
  )
};

export default HourTable;