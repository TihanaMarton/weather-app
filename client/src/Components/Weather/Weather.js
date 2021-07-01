import React, { useEffect, useState } from 'react';
import axios from '../../Axios/WeatherAxios';
import './Weather.css';
import { storeAddedCity, getStoredCity } from '../../Store/Actions/Weather';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import SingleCityWeather from './SingleCityWeather';

const Weather = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [errorMsg, setErrorMsg] = useState('');
  const [addMore, setAddMore] = useState(false);
  const cities = useSelector(state => state.cities)
  const dispatch = useDispatch();

  const search = evt => {
    if (evt.key === "Enter") {
      if (cities.length < 10 || addMore === true)
        axios.get(`/weather?q=${query}&units=metric`)
          .then(result => {
            setWeather(result.data);
            setQuery('');
            dispatch(storeAddedCity(result.data))
          })
          .catch(err => {
            console.log(err);
          });
      else {
        setErrorMsg('Jeste li sigurni da želite unijeti više od 10 gradova ?')
      }
    }
  }

  const handleResponseNo = () => {
    setErrorMsg('')
    setAddMore(false)
  }

  const handleResponseYes = () => {
    setErrorMsg('')
    setAddMore(true)
  }

  useEffect(() => {
    dispatch(getStoredCity(weather))
  }, [])


  return (
    <>
      <div className='body' >
        <main>
          <div className='search-box'>
            <input
              type="text"
              className='search-bar'
              placeholder="Search..."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          <div className='msg'>{errorMsg} {
            errorMsg !== '' ?
              <>
                <Button variant='light' onClick={handleResponseYes}>Da</Button>
                <Button variant='light' className='ml-2' onClick={handleResponseNo}>Ne</Button>
              </>
              :
              <></>
          }</div>
          <div className="container-fluid">
            <div className="row">
              {cities.map((city, index) =>
                <div key={index} >
                  <SingleCityWeather id={index} weather={city} >
                  </SingleCityWeather>
                </div>)}
            </div>
          </div>
        </main>
      </div>
    </>
  )
};

export default Weather;