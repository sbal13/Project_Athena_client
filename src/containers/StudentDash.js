import React from 'react'
import {connect} from 'react-redux'
import {getUserTeachers} from '../actions/users'
import {getStudentAssignments} from '../actions/assignments'
import {Grid, Card} from 'semantic-ui-react'
import StudentDashControls from '../components/StudentDashControls'
import AssignmentTable from '../components/AssignmentTable'

class StudentDash extends React.Component{

	state = {
		teacherFilter: null,
		subjectFilter: null,
		statusFilter: null,
		filterByTeacher: false,
		filterBySubject: false,
		filterByStatus: false,
		loaded: false
	}

	componentDidMount(){
		this.props.getDashboardInfo(this.props.student.id)
		.then(res => this.setState({loaded: true}))
	}

	chooseFilter = (event, data) => {
		this.setState({[data.name]: data.value})
	}

	toggle = (name) =>{
		this.setState({[name]: !this.state[name]})
	}

	goToAssignment = (event) => {
		this.props.history.push(`/assignment/${event.target.name}`)
	}

	applyFilter = () =>{
		let filteredAssignments = this.props.assignments.slice()

		if (this.state.filterByTeacher) {
			filteredAssignments = filteredAssignments.filter(assignment => assignment.issued_assignments.assignment_details.teacher_id == this.state.teacherFilter)
		}

		if (this.state.filterBySubject) {
			filteredAssignments = filteredAssignments.filter(assignment => assignment.issued_assignments.assignment_details.subject === this.state.subjectFilter)
		}

		if (this.state.filterByStatus) {
			filteredAssignments = filteredAssignments.filter(assignment => assignment.issued_assignments.details.status === this.state.statusFilter)
		}

		return filteredAssignments
	}

	shouldApplyFilter = ()=> {
		return this.state.filterByStatus || this.state.filterBySubject || this.state.filterByTeacher
	}


	render(){

		console.log(this.props)

		let assignments = this.props.assignments

		if (this.shouldApplyFilter()){
			assignments = this.applyFilter()
		}

		return (
			<Grid centered columns={2}>
				<Grid.Column width={5}>
					<Card fluid>
						<Card.Header centered>Sort and Filter</Card.Header>
						<Card.Content>
							<StudentDashControls teachers={this.props.teachers} 
												 chooseFilter={this.chooseFilter}
												 toggle={this.toggle}
												 filterByTeacher= {this.state.filterByTeacher}
												 filterBySubject= {this.state.filterBySubject}	
												 filterByStatus= {this.state.filterByStatus}/>
						</Card.Content>
					</Card>
				</Grid.Column>
				<Grid.Column width={10}>
					<Card fluid style={{height: "500px", overflow:"auto"}}>
						{this.state.loaded ? <AssignmentTable users={this.props.teachers} assignments={assignments} isStudent={true} goToAssignment={this.goToAssignment}/>: null}
					</Card>
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

		// const displayedTeacher = this.props.teachers.find(teacher => teacher.id === this.state.displayedTeacherId) || {first_name: "", last_name: "", subjects:[]}

		// const assignmentsToSort = this.state.displayedTeacherId ? this.state.sortedByTeacher : this.props.assignments

		// const pendingAssignments = assignmentsToSort.length > 0 ? assignmentsToSort.filter(assignment => assignment.issued_assignments.details.status === "Pending").length : 0

		// const teacherDetails = (
		// 	 <Table celled padded>
		// 	    <Table.Header>
		// 	      <Table.Row>
		// 	        <Table.HeaderCell>Username</Table.HeaderCell>
		// 	        <Table.HeaderCell>Name</Table.HeaderCell>
		// 	        <Table.HeaderCell>Email</Table.HeaderCell>
		// 	        <Table.HeaderCell>Subjects</Table.HeaderCell>
		// 	        <Table.HeaderCell>Pending Assignments</Table.HeaderCell>
		// 	      </Table.Row>
		// 	    </Table.Header>	
		// 	    <Table.Body>
		// 	    	<Table.Row>
		// 		        <Table.Cell><Link to={`/user/${displayedTeacher.id}`}>{displayedTeacher.username}</Link></Table.Cell>
		// 		        <Table.Cell>{`${displayedTeacher.first_name} ${displayedTeacher.last_name}`}</Table.Cell>
		// 		        <Table.Cell>{displayedTeacher.email}</Table.Cell>
		// 		        <Table.Cell>{displayedTeacher.subjects.join(", ")}</Table.Cell>
		// 		        <Table.Cell>{pendingAssignments}</Table.Cell>
		// 	    	</Table.Row>
		// 	    </Table.Body>
		// 	</Table>
		// )

						// <Grid.Row>
						// 	<Grid.Column>
						// 		<Card fluid>
						// 			{teacherDetails}
						// 		</Card>
						// 	</Grid.Column>
						// </Grid.Row>

export default connect(mapStateToProps,mapDispatchToProps)(StudentDash)