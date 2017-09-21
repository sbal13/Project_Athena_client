import React from 'react';
import LoginForm from '../components/LoginForm'

class LoginPage extends React.Component {
	render(){
		return (
		<div>
			<LoginForm history={this.props.history}/>
		</div>
	)}
}

export default LoginPage