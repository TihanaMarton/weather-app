import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from '../../Axios/WeatherAxios';
import './Weather.css';
import { Table } from 'react-bootstrap';
import HoursInOneDay from './HoursInOneDay';

const HourlyForecast = () => {
  const [hours, setHours] = useState([])
  let { name, day } = useParams();

  useEffect(() => {
    if (hours.length === 0) {
      axios.get(`/weather?q=${name}&units=metric`)
        .then(response => {
          let coord = response.data.coord;
          axios.get(`/onecall?lon=${coord.lon}&lat=${coord.lat}&exclude=current,minutely,daily,alerts&units=metric`)
            .then(res => {
              let arrHourly = res.data.hourly;

              let arrResult = arrHourly.filter(h => {
                let d = new Date(h.dt * 1000)
                return d.getDay() == day
              })
              setHours(arrResult)
            })
        })
        .catch(err => {
          console.log(err);
        })
    }

  }, [hours])


  return (
    <main className='body'>
      <h1 className='color-white'>{name}</h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <Table responsive="md">
              <tbody>
                {hours.map((date, index) =>
                  <HoursInOneDay key={index} weather={date} />
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default HourlyForecast;