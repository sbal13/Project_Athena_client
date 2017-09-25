import React from 'react'
import {connect} from 'react-redux'
import {getUserStudents} from '../actions/users'
import {getAllIssuedAssignments, getTeacherAssignments, assign} from '../actions/assignments'
import {Grid, Card, Table} from 'semantic-ui-react'
import TeacherDashControls from '../components/TeacherDashControls'
import AssignmentTable from '../components/AssignmentTable'

class TeacherDash extends React.Component{

	state = {
		displayedStudentId: null,
		sortedByStudent: [],
		chosenAssignmentId: null,
	}

	componentDidMount(){
		this.props.getDashboardInfo(this.props.teacher.id)
	}

	openDetails = (event, data) => {
		const studentId = data.value
		const filteredAssignments = this.props.studentAssignments.filter(assignment => assignment.issued_assignments.details.student_id === studentId)
		this.setState({displayedStudentId: studentId, sortedByStudent:filteredAssignments})
	}

	chooseAssignment = (event, data) => {
		this.setState({chosenAssignmentId: data.value})
	}

	assignAssignment = () => {
		this.props.assign(this.state.displayedStudentId, this.state.chosenAssignmentId)

		this.setState({displayedStudentId: null, chosenAssignmentId: null})
	}


	render(){
		const displayedStudent = this.props.students.find(student => student.id === this.state.displayedStudentId) || {first_name: "", last_name: "", subjects:[]}

		const studentDetails = (
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
				        <Table.Cell>{displayedStudent.username}</Table.Cell>
				        <Table.Cell>{`${displayedStudent.first_name} ${displayedStudent.last_name}`}</Table.Cell>
				        <Table.Cell>{displayedStudent.email}</Table.Cell>
				        <Table.Cell>{displayedStudent.subjects.join(", ")}</Table.Cell>
				        <Table.Cell></Table.Cell>
			    	</Table.Row>
			    </Table.Body>
			</Table>
		)

		console.log(this.state)
		return (
			<Grid centered columns={2}>
				<Grid.Column width={3}>
					<Card fluid>
						<TeacherDashControls students={this.props.students} assign={this.assignAssignment} chooseAssignment={this.chooseAssignment} assignments={this.props.assignments} openDetails={this.openDetails}/>
					</Card>
				</Grid.Column>
				<Grid.Column width={10}>
					<Grid columns={1}>
						<Grid.Row>
							<Grid.Column>
								<Card fluid>
									{studentDetails}
								</Card>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row >
							<Grid.Column>
								<Card fluid style={{height: "400px", overflow:"auto"}}>
									<AssignmentTable assignments={this.state.displayedStudentId ? this.state.sortedByStudent: this.props.studentAssignments}/>
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
		students: state.user.userStudents,
		assignments: state.assignment.teacherAssignments,
		studentAssignments: state.assignment.allStudentAssignments

	}
}

function mapDispatchToProps(dispatch){
	return{
		getDashboardInfo: (teacherId) => {
			return dispatch(getUserStudents(teacherId))
				   .then(res => dispatch(getAllIssuedAssignments(teacherId)))
				   .then(res => dispatch(getTeacherAssignments(teacherId)))
		},

		assign: (studentId, assignmentId) => {
			dispatch(assign(studentId, assignmentId))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(TeacherDash)