import React from 'react';

class SignupForm extends React.Component {

	state = {
		username: "",
		password: "",
		passwordConfirmation: ""
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
		console.log(this.state)
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
			<label>Password Confirmation</label>
			<input type="password"
				   name="passwordConfirmation" 
				   value={this.state.passwordConfirmation} 
				   placeholder="Password Confirmation"
				   onChange={this.handleChange}/>
			<input type="submit"
				   name="Log In"/>
		</form>)
	}
	
}

export default SignupForm