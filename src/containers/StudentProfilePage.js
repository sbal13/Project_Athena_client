import React from 'react';
import {Grid, Card, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getStudentAssignments} from '../actions/assignments'
import AssignmentList from '../components/AssignmentList'





class StudentProfilePage extends React.Component {

	componentDidMount(){
		this.props.getStudentAssignments(this.props.student.id)
	}

	componentWillUpdate(nextProps){
		if (this.props.student.id !== nextProps.student.id){
			this.props.getStudentAssignments(nextProps.student.id)
		}
	}

	render(){
		const {description, username, email, subjects,first_name, last_name} = this.props.student
		const completedAssignments = this.props.studentAssignments.map(assignment => { return {details: assignment.issued_assignments.assignment_details}})
		return (
			<Grid centered columns={2}>
				<Grid.Column width={4}>
					<Card fluid>
						<Card.Header textAlign="center"><h3>Student Details</h3></Card.Header>
						<Card.Content>
							<p>Username: {username}</p>
							<p>Name: {first_name + " " + last_name}</p>
							<p>Email: {email}</p>

							<h4>About me:</h4>
							<Segment>
								<p>{description}</p>
								<p><strong>I want to learn: </strong>{subjects.join(", ")}</p>
							</Segment>
							</Card.Content>
					</Card>
				</Grid.Column>
				<Grid.Column width={10}>
					<Card fluid style={{height: "400px", overflow:"auto"}}>
						<Card.Header textAlign="center"><h3>Assignments completed by this student</h3></Card.Header>
						<Card.Content>
							{this.props.studentAssignments.length > 0 ? <AssignmentList history={this.props.history} assignments={completedAssignments}/> : null}
						</Card.Content>
					</Card>
				</Grid.Column>
			</Grid>
	)
	}
}

function mapStateToProps(state){
	return{
		studentAssignments: state.assignment.studentAssignments
	}
}

function mapDispatchToProps(dispatch){
	return{
		getStudentAssignments: (id)=> {
			return dispatch(getStudentAssignments(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfilePage)