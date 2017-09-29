import React from 'react'
import {connect} from 'react-redux'
import {getSubmittedAssignment} from '../actions/assignments'
import ViewAndGrade from '../components/ViewAndGrade'


class SubmittedAssignmentPage extends React.Component{

	state={
		isTeacher: null
	}

	componentDidMount(){
		if(!localStorage.getItem('jwt')){
			this.props.history.push('/login')
		} else {
			const assignmentId = this.props.location.pathname.split("/")[2]
			this.props.getSubmittedAssignment(assignmentId)
		}
	}

	componentWillReceiveProps(nextProps){


		if (nextProps.currentSubmittedAssignment.details && nextProps.currentUser.id) {
			if (nextProps.currentSubmittedAssignment.details.student_id != nextProps.currentUser.id && nextProps.currentSubmittedAssignment.assignment_details.teacher_id != nextProps.currentUser.id){
				this.props.history.push('/dashboard')
				alert("You are not authorized to view this student's assignment!")
			} else {
				this.setState({isTeacher: this.props.currentUser.user_type === "teacher"})
			}
		}
	}

	componentWillUpdate(nextProps){
		const assignmentId = nextProps.location.pathname.split("/")[2]
		if (nextProps.currentSubmittedAssignment.details && nextProps.currentSubmittedAssignment.details.id != assignmentId){
			nextProps.getSubmittedAssignment(assignmentId)
		}
	}

	render(){
		console.log("Rendering...")
		return this.props.currentSubmittedAssignment.details ? <ViewAndGrade currentUser={this.props.currentUser} 
																			  isTeacher={this.state.isTeacher} 
																			  history={this.props.history}
																			  assignment={this.props.currentSubmittedAssignment}/> : null
	}
}



function mapDispatchToProps(dispatch){
	return {
		getSubmittedAssignment: (submittedAssignmentId)=>{
			dispatch(getSubmittedAssignment(submittedAssignmentId))
		}
	}
}
function mapStateToProps(state){
	return {
		currentSubmittedAssignment: state.assignment.currentSubmittedAssignment
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmittedAssignmentPage)
