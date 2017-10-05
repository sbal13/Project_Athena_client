import React from 'react';
import LoginForm from '../components/LoginForm'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class LoginPage extends React.Component {

	render(){
		return (
			<div>
				{this.props.loggedIn ? <Redirect to='/index'/> : <LoginForm history={this.props.history}/>}
			</div>
	)}
}

function mapStateToProps(state){
	return{
		loggedIn: state.auth.loggedIn
	}
}

export default connect(mapStateToProps)(LoginPage)