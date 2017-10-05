import React from 'react';
import SignupForm from '../components/SignupForm'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class SignupPage extends React.Component {

	render(){
		return (
			<div>
				{this.props.loggedIn ? <Redirect to='/dashboard'/> : <SignupForm history={this.props.history}/>}
			</div>)
	}
}

function mapStateToProps(state){
	return{
		loggedIn: state.auth.loggedIn
	}
}

export default connect(mapStateToProps)(SignupPage)