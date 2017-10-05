import React from 'react'
import {connect} from 'react-redux'
import StudentDash from './StudentDash'
import TeacherDash from './TeacherDash'

class DashboardPage extends React.Component{

	componentDidMount(){
		if (!this.props.loggedIn) {
			this.props.history.push('/login')
		}
	}


	render(){
		let dashType;
		 if(this.props.currentUser.user_type === "teacher") {
		 	dashType = <TeacherDash teacher = {this.props.currentUser} history={this.props.history}/>
		 } else if(this.props.currentUser.user_type === "student") {
		 	dashType = <StudentDash student = {this.props.currentUser} history={this.props.history}/>
		 }

		return (
			<div>
				{Object.keys(this.props.currentUser).length > 0 ? dashType : null}
			</div>
	)}
}

function mapStateToProps(state){
	return{
		currentUser: state.auth.currentUser,
		loggedIn: state.auth.loggedIn
	}
}

export default connect(mapStateToProps)(DashboardPage)