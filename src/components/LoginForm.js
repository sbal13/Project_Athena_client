import React from 'react';

class LoginForm extends React.Component {

	state = {
		username: "",
		password: ""
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		console.log(this.state)
	}

	render(){
		return (
		<form onSubmit={this.handleSubmit}>
			<label>Username</label>
			<input type="text"
				   name="username" 
				   value={this.state.username} 
				   placeholder="Username"
				   onChange={this.handleChange}/>
			<label>Password</label>
			<input type="password"
				   name="password" 
				   value={this.state.password} 
				   placeholder="Password"
				   onChange={this.handleChange}/>
			<input type="submit"
				   name="Log In"/>
		</form>)
	}
	
}

export default LoginForm