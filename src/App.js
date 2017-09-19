import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import SignupPage from './containers/SignupPage'
import LoginPage from './containers/LoginPage'
import NewTestPage from './containers/NewTestPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar/>
        <Route exact path="/"/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/new-test" component={NewTestPage}/>
      </div>
    );
  }
}

export default App;
