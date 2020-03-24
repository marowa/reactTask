import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterForm from './components/register/registerform';
import OTP from './components/register/OTP';
import Login from './components/register/Login';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

class App extends Component {
  constructor(){
    super();
    this.state={
      user: {}
    }
  }
  render(){
    return (
      <div className="App">
        <Switch>
          <Route 
            exact 
            path={"/"}
            component={RegisterForm}
          />
          <Route 
            exact
            path={"/otp"}
            component={OTP}
          />
          <Route 
            exact
            path={"/login"}
            component={Login}
          />
        </Switch>
      </div>
    );
  }
  
}

export default App;
