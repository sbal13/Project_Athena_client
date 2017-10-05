import React from 'react'
import {connect} from 'react-redux'
import {getUserTeachers} from '../actions/users'
import {getStudentAssignments} from '../actions/assignments'
import {Grid, Card} from 'semantic-ui-react'
import moment from 'moment';
import StudentDashControls from '../components/StudentDashControls'
import AssignmentTable from '../components/AssignmentTable'
import PolarChart from '../components/PolarChart'
import AssignmentBarChart from '../components/AssignmentBarChart'
import StudentScatterChart from '../components/StudentScatterChart'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


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

	componentWillMount(){
		this.props.getDashboardInfo(this.props.student.id)
		.then(res => this.setState({loaded: true}))
	}
	componentWillReceiveProps(nextProps){
		if (this.props.student.id !== nextProps.student.id){
			this.props.getDashboardInfo(this.props.student.id)
			.then(res => this.setState({loaded: true}))
		}
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

	isLoaded = () => {
		return this.props.teachers.length > 0 && this.props.assignments.length > 0
	}

	getEarliest = (assignments) =>{
		let min = null;

		assignments.forEach(assignment => {
			if (!min){
				min = assignment.issued_assignments.details.finalized_date
			} else if (min > assignment.issued_assignments.details.finalized_date){
				min  = assignment.issued_assignments.details.finalized_date
			}
		})

		return moment(min)


	}
	getLatest = (assignments) =>{
		let max = null

		assignments.forEach(assignment => {
			if (!max){
				max = assignment.issued_assignments.details.finalized_date
			} else if (max < assignment.issued_assignments.details.finalized_date){
				max  = assignment.issued_assignments.details.finalized_date
			}
		})

		return moment(max)
	}

	getInitialDateRange = (assignments) => {
		if (assignments.length > 0){
			const range = {min: this.getEarliest(assignments), max: this.getLatest(assignments)}
			return range
		} else {
			return {min: moment(), max: moment()}
		}

	}



	render(){
		let assignments = this.props.assignments

		if (this.shouldApplyFilter()){
			assignments = this.applyFilter()
		}

		let gradedAssignments = Object.keys(this.props.assignments).length > 0 ?this.props.assignments.filter(assignment => assignment.issued_assignments.details.status === "Graded") : []


		return (
			<Grid centered columns={2}>
				<Grid.Row>
					<Grid.Column width={4}>
						<Card fluid>
							<Card.Header textAlign="center"><h3>Sort and Filter</h3></Card.Header>
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
					<Grid.Column width={11}>
						<Card fluid style={{height: "500px", overflow:"auto"}}>
							{this.state.loaded ? <AssignmentTable users={this.props.teachers} assignments={assignments} isStudent={true} goToAssignment={this.goToAssignment}/>: null}
						</Card>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row>
					<Grid.Column width={12}>
						<Tabs>
							<TabList>
								<Tab>Average Performance</Tab>
								<Tab>Overall Performance</Tab>
								<Tab>Performance Over Time</Tab>
							</TabList>
							<TabPanel>
								<PolarChart students={[this.props.student]} isStudent={true} studentAssignments={gradedAssignments}/>
							</TabPanel>
							<TabPanel>
								<AssignmentBarChart teachers={this.props.teachers} assignments={gradedAssignments}/>
							</TabPanel>
							<TabPanel>
								<StudentScatterChart teachers={this.props.teachers} range={this.getInitialDateRange(gradedAssignments)} assignments={gradedAssignments}/>
							</TabPanel>
						</Tabs>
					</Grid.Column>
				</Grid.Row>

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