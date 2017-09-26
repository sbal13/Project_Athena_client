import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import SignupPage from './containers/SignupPage'
import LoginPage from './containers/LoginPage'
import NewTestPage from './containers/NewTestPage'
import ProfilePage from './containers/ProfilePage'
import CompleteAssignmentPage from './containers/CompleteAssignmentPage'
import DashboardPage from './containers/DashboardPage'
import IndexPage from './containers/IndexPage'
import {getUserData} from './actions/auth'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Grid} from 'semantic-ui-react'


class App extends Component {


  componentDidMount() {
    if(!!localStorage.getItem("jwt") && !this.props.username){
      this.props.getUser(localStorage.getItem('jwt'))
    }
  }

  render() {
    return (
      <Grid relaxed columns={1}>
        <Grid.Row>
          <Grid.Column>
            <NavBar history={this.props.history}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Route exact path="/"/>
            <Route exact path="/index" component={IndexPage}/>
            <Route exact path="/signup" component={SignupPage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/dashboard" component={DashboardPage}/>
            <Route exact path="/new-assignment" render={(props) => <NewTestPage {...props} currentUser={this.props.currentUser}/>}/>
            <Route path="/assignment/:id" component={CompleteAssignmentPage}/>
            <Route path="/user/:id" component={ProfilePage}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
function mapStateToProps (state) {
  return {
    loggedIn: state.auth.loggedIn,
    currentUser: state.auth.currentUser,
    allAssignments: state.assignment.allAssignments
    }
}

function mapDispatchToProps (dispatch) {
  return {
    getUser: (jwt) => {
      dispatch(getUserData(jwt))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
