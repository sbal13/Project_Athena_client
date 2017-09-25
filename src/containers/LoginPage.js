import React from 'react';
import LoginForm from '../components/LoginForm'

class LoginPage extends React.Component {
	componentWillMount(){
		if(localStorage.getItem('jwt')){
			this.props.history.push('/index')
		}
	}
	render(){
		return (
			<div>
				<LoginForm history={this.props.history}/>
			</div>
	)}
}

export default LoginPage