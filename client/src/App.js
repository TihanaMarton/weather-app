import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Weather from './Components/Weather/Weather';
import FiveDaysForecast from './Components/Weather/FiveDaysForecast';
import HourlyForecast from './Components/Weather/HourlyForeacast';

function App() {

  const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
      auth() === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )
  const isAuthenticated = () => {
    return localStorage.getItem('x-token') !== null;
  }

  return (
    <Router>
      <Switch>
        <Redirect exact from='/' to='/login' />
        <Route exact path='/login' component={Login}></Route>
        <Route exact path='/register' component={Register}></Route>
        <PrivateRoute exact path='/weather' component={Weather} auth={isAuthenticated} ></PrivateRoute>
        <PrivateRoute exact path='/weather/:name' component={FiveDaysForecast} auth={isAuthenticated} ></PrivateRoute>
        <PrivateRoute exact path='/weather/:name/:day' component={HourlyForecast} auth={isAuthenticated} ></PrivateRoute>
      </Switch>
    </Router>
  )
};
export default App;
