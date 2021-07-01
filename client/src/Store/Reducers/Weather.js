import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  cities: []
}

const Weather = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_ADDED_CITY:
      state.cities = []
      return {
        ...state,
        cities: [...state.cities]
      }

    case actionTypes.GET_STORED_CITY: {
      state.cities = []
      for (let i of action.payload) {
        state.cities.push(i)
      }
      return {
        ...state,
        cities: [...state.cities]
      }
    }
    case actionTypes.DELETE_STORED_CITY:
      state.cities = []
      return {
        ...state,
        cities: [...state.cities]
      }

    default:
      return state;
  }
};

export default Weather;
