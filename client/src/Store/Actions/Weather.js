import * as actionTypes from './actionTypes';
import axios from '../../Axios/ApiAxios';


export const storeAddedCity = (openWeatherApiCityData, city) => {
  return dispatch => {
    axios.post('/weather/city', openWeatherApiCityData).then(response => {
      dispatch({
        type: actionTypes.STORE_ADDED_CITY,
        payload: city
      })
      dispatch(getStoredCity())
    })
  }
}

export const getStoredCity = () => {
  return dispatch => {
    axios.get('/weather/city').then(response => {
      dispatch({
        type: actionTypes.GET_STORED_CITY,
        payload: response.data
      })
    })
  }
}

export const deleteStoredCity = (index) => {
  return dispatch => {
    axios.delete('/weather/city?id=' + index).then(response => {
      dispatch({
        type: actionTypes.DELETE_STORED_CITY,
        payload: index
      })
      dispatch(getStoredCity())
    })
  }
}

