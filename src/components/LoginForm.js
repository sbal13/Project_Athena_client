import React from 'react';
import { connect } from 'react-redux'
import {login} from '../actions/auth'
import {Form, Segment, Button, Grid} from 'semantic-ui-react'
import {alertOptions} from '../helpers/AlertOptions'
import AlertContainer from 'react-alert'

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
		this.props.login(this.state, this.props.history)
		.then(failure => {
			if (failure){
				this.msg.error(failure)
			}
		})
	}

	render(){
		return (
		<Grid centered verticalAlign="middle" columns = {3}>
			<Grid.Column>
				<Segment raised>
					<Form onSubmit={this.handleSubmit}>
						<Form.Input type="text"
							   fluid
							   name="username" 
							   value={this.state.username} 
							   placeholder="username"
							   required
							   onChange={this.handleChange}/>
						<Form.Input type="password"
							   name="password"
							   fluid 
							   value={this.state.password} 
							   placeholder="password"
							   required
							   onChange={this.handleChange}/>
						<Button fluid
								type="submit"
								color={(!!this.state.username && !!this.state.password) ? "green" : null}>log in</Button>
					</Form>
				</Segment>
			</Grid.Column>
			<AlertContainer ref={a => this.msg = a} {...alertOptions} />

		</Grid>
	)}
	
}

function mapDispatchToProps (dispatch) {
	return {
		login: (userData, history) => {
			return dispatch(login(userData, history))
		}
	}
}

export default connect(null, mapDispatchToProps)(LoginForm)