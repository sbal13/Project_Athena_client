import React from 'react'
import {connect} from 'react-redux'
import {getUserTeachers} from '../actions/users'
import {getStudentAssignments} from '../actions/assignments'
import {Grid, Card, Table} from 'semantic-ui-react'
import StudentDashControls from '../components/StudentDashControls'
import AssignmentTable from '../components/AssignmentTable'

class StudentDash extends React.Component{

	state = {
		displayedTeacherId: null,
		sortedByTeacher: []
	}

	componentDidMount(){
		this.props.getDashboardInfo(this.props.student.id)
	}

	openDetails = (event, data) => {
		const teacherId = data.value
		const filteredAssignments = this.props.assignments.filter(assignment => assignment.issued_assignments.assignment_details.teacher_id === teacherId)
		this.setState({displayedTeacherId: teacherId, sortedByTeacher: filteredAssignments})
	}

	goToAssignment = (event) => {
		this.props.history.push(`/assignment/${event.target.name}`)
	}


	render(){

		const displayedTeacher = this.props.teachers.find(teacher => teacher.id === this.state.displayedTeacherId) || {first_name: "", last_name: "", subjects:[]}

		const assignmentsToSort = this.state.sortedByTeacher.length === 0 ? this.props.assignments : this.state.sortedByTeacher

		const pendingAssignments = assignmentsToSort.length > 0 ? assignmentsToSort.filter(assignment => assignment.issued_assignments.details.status === "Pending").length : 0


		const teacherDetails = (
			 <Table celled padded>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>Username</Table.HeaderCell>
			        <Table.HeaderCell>Name</Table.HeaderCell>
			        <Table.HeaderCell>Email</Table.HeaderCell>
			        <Table.HeaderCell>Subjects</Table.HeaderCell>
			        <Table.HeaderCell>Pending Assignments</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>	
			    <Table.Body>
			    	<Table.Row>
				        <Table.Cell>{displayedTeacher.username}</Table.Cell>
				        <Table.Cell>{`${displayedTeacher.first_name} ${displayedTeacher.last_name}`}</Table.Cell>
				        <Table.Cell>{displayedTeacher.email}</Table.Cell>
				        <Table.Cell>{displayedTeacher.subjects.join(", ")}</Table.Cell>
				        <Table.Cell>{pendingAssignments}</Table.Cell>
			    	</Table.Row>
			    </Table.Body>
			</Table>
		)


		return (
			<Grid centered columns={2}>
				<Grid.Column width={3}>
					<Card fluid>
						<Card.Header>your teachers</Card.Header>
						<Card.Content>
							<StudentDashControls teachers={this.props.teachers} openDetails={this.openDetails}/>
						</Card.Content>
					</Card>
				</Grid.Column>
				<Grid.Column width={10}>
					<Grid columns={1}>
						<Grid.Row>
							<Grid.Column>
								<Card fluid>
									{teacherDetails}
								</Card>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row >
							<Grid.Column>
								<Card fluid style={{height: "400px", overflow:"auto"}}>
									<AssignmentTable users={this.props.teachers} assignments={this.state.displayedTeacherId ? this.state.sortedByTeacher: this.props.assignments} isStudent={true} goToAssignment={this.goToAssignment}/>
								</Card>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Grid.Column>
			</Grid>
	)}
}

function mapStateToProps (state){
	return{
		teachers: state.user.userTeachers,
		assignments: state.assignment.studentAssignments
	}
}

function mapDispatchToProps(dispatch){
	return{
		getDashboardInfo: (studentId) => {
			return dispatch(getUserTeachers(studentId))
			.then(res => dispatch(getStudentAssignments(studentId)))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(StudentDash)