import React from 'react'
import {connect} from 'react-redux'
import StudentDash from './StudentDash'
import TeacherDash from './TeacherDash'

class DashboardPage extends React.Component{

	render(){
		let dashType;

		 if(this.props.currentUser.user_type === "teacher") {
		 	dashType = <TeacherDash teacher = {this.props.currentUser}/>
		 } else if(this.props.currentUser.user_type === "student") {
		 	dashType = <StudentDash student = {this.props.currentUser}/>
		 }

		return (
			<div>
				{dashType}
			</div>
	)}
}

function mapStateToProps(state){
	return{
		currentUser: state.auth.currentUser
	}
}

export default connect(mapStateToProps)(DashboardPage)