import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import SignupPage from './containers/SignupPage'
import LoginPage from './containers/LoginPage'
import NewTestPage from './containers/NewTestPage'
import CompleteAssignmentPage from './containers/CompleteAssignmentPage'
import IndexPage from './containers/IndexPage'
import {getUserData} from './actions/auth'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'


class App extends Component {


  componentDidMount() {
    if (!localStorage.getItem("jwt")) {
      
    } else if(!this.props.username){
      this.props.getUser(localStorage.getItem('jwt'))
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar/>
        <Route exact path="/"/>
        <Route exact path="/index" component={IndexPage}/>
        <Route exact path="/signup" component={SignupPage}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/new-assignment" component={NewTestPage}/>
        <Route path="/assignment/:id" component={CompleteAssignmentPage}/>
      </div>
    );
  }
}
function mapStateToProps (state) {
  return {username: state.auth.user.username,
          allAssignments: state.assignment.allAssignments}
}

function mapDispatchToProps (dispatch) {
  return {
    getUser: (jwt) => {
      dispatch(getUserData(jwt))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
