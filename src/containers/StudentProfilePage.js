import React from 'react';
import {Grid, Card, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {getStudentAssignments} from '../actions/assignments'
import AssignmentList from '../components/AssignmentList'





class StudentProfilePage extends React.Component {

	componentDidMount(){
		this.props.getStudentAssignments(this.props.student.id)
	}

	shouldComponentUpdate(nextProps){
		return this.props.student.id !== nextProps.student.id || this.props.studentAssignments.length === 0
	}

	render(){
		const {description, username, email, subjects,first_name, last_name} = this.props.student

		const completedAssignments = this.props.studentAssignments.map(assignment => { return {details: assignment.issued_assignments.assignment_details}})
		return (
			<Grid centered columns={2}>
				<Grid.Column width={4}>
					<Card style={{position: "fixed", top: "20%"}}>
						<Card.Header>
							Student Profile
						</Card.Header>
						<Card.Content>
							<p>Username: {username}</p>
							<p>Name: {first_name + " " + last_name}</p>
							<p>Email: {email}</p>

							<h4>About me:</h4>
							<Segment>
								<p>{description}</p>
								<p>I want to learn: {subjects.join(", ")}</p>
							</Segment>
							</Card.Content>
					</Card>
				</Grid.Column>
				<Grid.Column width={10}>
					<Grid columns={1}>
						<Grid.Row>
							<Grid.Column>
								<Segment style={{height: "100px"}}>

								</Segment>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row >
							<Grid.Column>
								<Card fluid style={{height: "400px", overflow:"auto"}}>
									{this.props.studentAssignments.length > 0 ? <AssignmentList history={this.props.history} assignments={completedAssignments}/> : null}
								</Card>
							</Grid.Column>
						</Grid.Row>
					</Grid>
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