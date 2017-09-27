import React from 'react';
import {Grid, Card, Segment} from 'semantic-ui-react'
import AssignmentList from '../components/AssignmentList'
import {connect} from 'react-redux'
import {getTeacherAssignments} from '../actions/assignments'

class TeacherProfilePage extends React.Component {

	

	componentWillMount(){
		this.props.getTeacherAssignments(this.props.teacher.id)
	}

	componentWillUpdate(nextProps){
		if (this.props.teacher.id !== nextProps.teacher.id){
			this.props.getTeacherAssignments(nextProps.teacher.id)
		}
	}


	render(){
		const {description, username, email, subjects,first_name, last_name} = this.props.teacher
		return (
			<Grid centered columns={2}>
				<Grid.Column width={4}>
					<Card style={{position: "fixed", top: "20%"}}>
						<Card.Header as="h3" textAlign="center">Teacher Profile</Card.Header>
						<Card.Content>
							<p>Username: {username}</p>
							<p>Name: {first_name + " " + last_name}</p>
							<p>Email: {email}</p>

							<h4>About me:</h4>
							<Segment>
								<p>{description}</p>
								<p>I teach: {subjects.join(", ")}</p>
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
									{this.props.teacherAssignments.length > 0 ? <AssignmentList history={this.props.history} assignments={this.props.teacherAssignments}/> : null}
								</Card>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Grid.Column>
			</Grid>
	)}
}

function mapStateToProps(state){
	return{
		teacherAssignments: state.assignment.teacherAssignments
	}
}

function mapDispatchToProps(dispatch){
	return{
		getTeacherAssignments: (id)=> {
			return dispatch(getTeacherAssignments(id))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfilePage)