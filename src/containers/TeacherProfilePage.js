import React from 'react';
import {Grid, Card, Segment, Button} from 'semantic-ui-react'
import AssignmentList from '../components/AssignmentList'
import {connect} from 'react-redux'
import {getTeacherAssignments} from '../actions/assignments'

class TeacherProfilePage extends React.Component {

	state = {
		revealKey: false
	}

	componentWillMount(){
		this.props.getTeacherAssignments(this.props.teacher.id)
	}

	componentWillUpdate(nextProps){
		if (this.props.teacher.id !== nextProps.teacher.id){
			this.props.getTeacherAssignments(nextProps.teacher.id)
		}
	}
	reveal = () => {
		this.setState({revealKey: !this.state.revealKey})
	}

	render(){
		const {description, username, email, subjects,first_name, last_name} = this.props.teacher
		return (
			<Grid centered columns={2}>
				<Grid.Column width={4}>
					<Card fluid>
						<Card.Header textAlign="center"><h3>Teacher Profile</h3></Card.Header>
						<Card.Content>
							<p>Username: {username}</p>
							<p>Name: {first_name + " " + last_name}</p>
							<p>Email: {email}</p>

							<h4>About me:</h4>
							<Segment>
								<p>{description}</p>
								<p><strong>I teach: </strong>{subjects.join(", ")}</p>
							</Segment>
							{this.props.currentUser.id === this.props.teacher.id ? <Button onClick={this.reveal} fluid color="orange">{this.state.revealKey ? "Hide" : "Reveal"} Teacher Key</Button> : null}
							{this.state.revealKey ? <Segment><h3>{this.props.teacher.teacher_key}</h3></Segment> : null}
						</Card.Content>
					</Card>
				</Grid.Column>
				<Grid.Column width={10}>
					<Grid columns={1}>
						<Grid.Row >
							<Grid.Column>
								<Card fluid style={{height: "400px", overflow:"auto"}}>
									<Card.Header textAlign="center"><h3>Assignments owned by this teacher</h3></Card.Header>
									<Card.Content>
										{this.props.teacherAssignments.length > 0 ? <AssignmentList history={this.props.history} assignments={this.props.teacherAssignments}/> : null}
									</Card.Content>
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
		currentUser: state.auth.currentUser,
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