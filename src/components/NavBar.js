import React from 'react';
import {Menu, Dropdown} from 'semantic-ui-react'
import {getUserData, logout} from '../actions/auth'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

class NavBar extends React.Component {

	loggedIn = () => {
		return !!localStorage.getItem("jwt")
	}

	componentDidMount() {
		if (this.loggedIn()) {
			this.props.getUser(localStorage.getItem('jwt'))
		}
	}

	handleLogout = () => {
		this.props.logout()
	}

	render(){

		const logoPath = this.loggedIn() ? "/index" : "/login"
		const loggedInMenu = (
			<Menu.Menu position="right">
				<Dropdown item text={this.props.username}>
					<Dropdown.Menu>
						<NavLink to='/profile'><Dropdown.Item>profile</Dropdown.Item></NavLink>
			            <NavLink to='/dashboard'><Dropdown.Item>dashboard</Dropdown.Item></NavLink>
			            <NavLink to='/new-test'><Dropdown.Item>new test</Dropdown.Item></NavLink>
			            <Dropdown.Item onClick={this.handleLogout}>log out</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			</Menu.Menu>
		) 


		return (
			<Menu>
				<NavLink to={logoPath} className="item">Athena</NavLink>
				{this.loggedIn() ? loggedInMenu : null}

			</Menu>
	)}
}

function mapStateToProps (state) {
	return {username: state.auth.user.username}
}

function mapDispatchToProps (dispatch) {
	return {
		getUser: (jwt) => {
			dispatch(getUserData(jwt))
		},
		logout: () => {
			dispatch(logout())
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
