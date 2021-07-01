import React, { useEffect, useState } from 'react';
import './Weather.css';
import axios from '../../Axios/WeatherAxios';
import { useParams } from 'react-router-dom';
import OneDayWeather from './OneDayWeather';
import { Link } from 'react-router-dom';


const FiveDaysForecast = () => {
  const [days, setDays] = useState([]);
  let { name } = useParams()
  const dateBins = {};


  useEffect(() => {
    if (days.length > 0) {
      return;
    }

    axios.get(`/forecast?q=${name}&units=metric`).then(response => {
      const today = new Date()
      const day = 60 * 60 * 24 * 1000;
      const nBins = 6
      for (let i = 0; i < nBins; i++) {
        const date = new Date(today.getTime() + i * day);
        dateBins[date.getDate()] = [];
      }

      let reports = response.data.list;
      for (const report of reports) {
        const reportDate = new Date(report.dt * 1000).getDate();
        dateBins[reportDate].push(report);
      }

      for (const d in dateBins) {
        setDays(oldArr => [...oldArr, dateBins[d][0]]);
      }
    })
  });

  return (
    <main className='body'>
      <h1 className='color-white'>{name}</h1>
      <div className="container-fluid">
        <div className="row">
          {days.sort((firstDate, secondDate) => firstDate.dt - secondDate.dt).map((day, index) =>
            <div key={index} className="col-md-3">
              <Link to={`/weather/${name}`} >
                <OneDayWeather weather={day} ></OneDayWeather>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
};

export default FiveDaysForecast;