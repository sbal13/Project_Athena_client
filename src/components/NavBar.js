import React from 'react';
import {Menu, Dropdown, Modal, Input, Button} from 'semantic-ui-react'
import {logout} from '../actions/auth'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {addTeacher} from '../actions/users'

class NavBar extends React.Component {

	state = {
		open: false,
		teacherKey: ""
	}

	loggedIn = () => {
		return !!localStorage.getItem("jwt")
	}

	handleLogout = () => {
		this.props.logout(this.props.history)
	}
	
	handleChange = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}

	closeModal = () => {
		this.setState({open: false})
	}

	openModal = () => {
		this.setState({open: true})
	}

	addTeacher = () => {
		this.closeModal()
		this.props.addTeacher(this.state.teacherKey)
		this.setState({teacherKey: ""})
	}

	render(){

		const logoPath = this.loggedIn() ? "/index" : "/login"

		const loggedInMenu = (
			<Menu.Menu position="right">
				<Dropdown item text={this.props.user.username}>
					<Dropdown.Menu>
						<NavLink to={`/user/${this.props.user.id}`}><Dropdown.Item>profile</Dropdown.Item></NavLink>
			            <NavLink to='/dashboard'><Dropdown.Item>dashboard</Dropdown.Item></NavLink>


			            {this.props.user.user_type === "teacher" ? 
			            <NavLink to='/new-assignment'><Dropdown.Item>new assignment</Dropdown.Item></NavLink> : 
			            <Dropdown.Item onClick={this.openModal}>add teacher</Dropdown.Item>}

			            <Dropdown.Item onClick={this.handleLogout}>log out</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Menu>
		) 

		const loggedOutMenu = (
			<Menu.Menu position="right">
				<NavLink className="item" activeClassName="" to='/signup'>sign up</NavLink>
				<NavLink className="item" activeClassName="" to='/login'>log in</NavLink>
			</Menu.Menu>
		)

		return (
		<div>
			<Menu>
				<NavLink to={logoPath} className="item" activeClassName="">Athena</NavLink>
				{this.loggedIn() ? loggedInMenu : loggedOutMenu}
			</Menu>
			<Modal open={this.state.open}
				   onClose={this.closeModal}>
				<Modal.Header>
					Add Teacher
				</Modal.Header>
				<Modal.Content>
					<strong>Please enter your teacher's passcode: </strong>
					<Input type="text"
						   name="teacherKey"
						   value={this.state.teacherKey}
						   onChange={this.handleChange}/>
				</Modal.Content>
				<Modal.Actions>
					<Button positive onClick={this.addTeacher} content='add teacher' />
					<Button negative onClick={this.closeModal} content='nevermind'/>
				</Modal.Actions>
			</Modal>
		</div>
	)}
}

function mapStateToProps (state) {
	return {user: state.auth.currentUser}
}

function mapDispatchToProps (dispatch) {
	return {
		logout: (history) => {
			dispatch(logout(history))
		},
		addTeacher: (teacherKey) => {
			dispatch(addTeacher(teacherKey))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
