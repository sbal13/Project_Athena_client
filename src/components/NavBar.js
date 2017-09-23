import React from 'react';
import {Menu, Dropdown} from 'semantic-ui-react'
import {logout} from '../actions/auth'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

class NavBar extends React.Component {

	loggedIn = () => {
		return !!localStorage.getItem("jwt")
	}

	handleLogout = () => {
		this.props.logout()
	}

	render(){

		const logoPath = this.loggedIn() ? "/index" : "/login"

		const loggedInMenu = (
			<Menu.Menu position="right">
				<Dropdown item text={this.props.user.username}>
					<Dropdown.Menu>
						<NavLink to='/profile'><Dropdown.Item>profile</Dropdown.Item></NavLink>
			            <NavLink to='/dashboard'><Dropdown.Item>dashboard</Dropdown.Item></NavLink>
			            {this.props.user.user_type === "teacher" ? <NavLink to='/new-assignment'><Dropdown.Item>new assignment</Dropdown.Item></NavLink> : null}
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
			<Menu>
				<NavLink to={logoPath} className="item" activeClassName="">Athena</NavLink>
				{this.loggedIn() ? loggedInMenu : loggedOutMenu}

			</Menu>
	)}
}

function mapStateToProps (state) {
	return {user: state.auth.user}
}

function mapDispatchToProps (dispatch) {
	return {
		logout: () => {
			dispatch(logout())
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
