import React from 'react'
import {connect} from 'react-redux'
import {getUserTeachers} from '../actions/users'
import {getStudentAssignments} from '../actions/assignments'
import {Grid, Card, Table} from 'semantic-ui-react'
import DashUserList from '../components/DashUserList'
import AssignmentTable from '../components/AssignmentTable'

class StudentDash extends React.Component{

	state = {
		displayedTeacherId: null,
		sortedByTeacher: []
	}

	componentDidMount(){
		this.props.getDashboardInfo(this.props.student.id)
	}

	openDetails = (teacherId) => {
		const filteredAssignments = this.props.assignments.filter(assignment => assignment.issued_assignments.assignment_details.teacher_id === teacherId)
		this.setState({displayedTeacherId: teacherId, sortedByTeacher: filteredAssignments})
	}

	resetDetails = () => {
		this.setState({displayedTeacherId: null, sortedByTeacher: []})
	}

	render(){

		const displayedTeacher = this.props.teachers.find(teacher => teacher.id === this.state.displayedTeacherId) || {first_name: "", last_name: "", subjects:[]}

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
				        <Table.Cell></Table.Cell>
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
							<DashUserList users={this.props.teachers} resetDetails={this.resetDetails} openDetails={this.openDetails}/>
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
									<AssignmentTable assignments={this.state.displayedTeacherId ? this.state.sortedByTeacher: this.props.assignments}/>
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