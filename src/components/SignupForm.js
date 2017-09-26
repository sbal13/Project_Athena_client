import React from 'react';
import { connect } from 'react-redux'
import {signup} from '../actions/auth'
import {validateInitialSignup} from '../helpers/validateSignup'
import {alertOptions} from '../helpers/AlertOptions'
import {Form, Segment, Button, Grid} from 'semantic-ui-react'
import UserDetails from "./UserDetails"
import AlertContainer from 'react-alert'



class SignupForm extends React.Component {

	state = {
		username: "",
		email: "",
		firstName: "",
		lastName: "",
		password: "",
		passwordConfirmation: "",
		type: "",
		teacherKey: "",
		description: "",
		subjects: []
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleInitialSubmit = (event) => {
		event.preventDefault()

		let validator = validateInitialSignup(this.state)
		if (validator.valid) {
			let teacherKey = event.target.value === "teacher" ? this.state.teacherKey : ""
			
			this.setState({type: event.target.value, teacherKey: teacherKey})
		} else {
			 validator.messages.forEach(message => {
			 	this.msg.error(message)
			 })
		}
	}

	handleFinalSubmit = () => {
		this.props.signup(this.state, this.props.history)
	}


	chooseSubject = (event, data) => {
		this.setState({subjects: data.value})
	}

	render(){

		let additionalDetails = <UserDetails handleFinalSubmit = {this.handleFinalSubmit} 
											 handleChange={this.handleChange} 
											 handleSubmit={this.handleSubmit} 
											 type={this.state.type} 
											 chooseSubject={this.chooseSubject}
											 subjects={this.state.subjects}
											 teacherKey={this.state.teacherKey}
											 description={this.state.description}/>

		return (
		<Grid centered verticalAlign="middle" columns = {3}>
		<Grid.Column>
		<Segment raised>

			<Form>
				<Form.Input type="text"
					   fluid
					   name="username" 
					   disabled={!!this.state.type}
					   value={this.state.username} 
					   placeholder="username"
					   onChange={this.handleChange}/>
					   
				<Form.Input type="text"
					   name="email"
					   fluid 
					   value={this.state.email} 
					   disabled={!!this.state.type}
					   placeholder="email"
					   onChange={this.handleChange}/>
					   
				<Form.Input type="text"
					   name="firstName"
					   fluid 
					   value={this.state.firstName}
					   disabled={!!this.state.type} 
					   placeholder="first name"
					   onChange={this.handleChange}/>
					   
				<Form.Input type="text"
					   name="lastName"
					   fluid 
					   value={this.state.lastName} 
					   disabled={!!this.state.type}
					   placeholder="last name"
					   onChange={this.handleChange}/>
					   
				<Form.Input type="password"
					   name="password"
					   fluid 
					   value={this.state.password} 
					   disabled={!!this.state.type}
					   placeholder="password"
					   onChange={this.handleChange}/>
					   
				<Form.Input type="password"
					   name="passwordConfirmation" 
					   fluid
					   value={this.state.passwordConfirmation} 
					   disabled={!!this.state.type}
					   placeholder="password confirmation"
					   onChange={this.handleChange}/>

				<Button.Group  fluid>
				    <Button color={"blue"} onClick={this.handleInitialSubmit} value="teacher">Teacher</Button>
				    <Button.Or />
				    <Button color={"orange"} onClick={this.handleInitialSubmit} value="student">Student</Button>
				</Button.Group>
			</Form>
		</Segment>

		{this.state.type ? additionalDetails : null}

		</Grid.Column>

		<AlertContainer ref={a => this.msg = a} {...alertOptions} />
		</Grid>
	)}
	
}

function mapDispatchToProps (dispatch) {
	return {
		signup: (userData, history) => {
			dispatch(signup(userData, history))
		}
	}
}

export default connect(null, mapDispatchToProps)(SignupForm)



