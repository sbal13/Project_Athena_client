import React from 'react'
import {connect} from 'react-redux'
import {getUserStudents} from '../actions/users'
import {getAllIssuedAssignments, getTeacherAssignments, assign} from '../actions/assignments'
import {Grid, Card} from 'semantic-ui-react'
import TeacherDashControls from '../components/TeacherDashControls'
import AssignmentTable from '../components/AssignmentTable'
import moment from 'moment';
import {alertOptions} from '../helpers/AlertOptions'
import AlertContainer from 'react-alert'
import BarChart from '../components/BarChart'



class TeacherDash extends React.Component{

	state = {
		studentFilter: null,
		assignmentFilter: null,
		subjectFilter: null,
		statusFilter: null,
		filterByStudent: false,
		filterByAssignment: false,
		filterBySubject: false,
		filterByStatus: false,
		chosenStudents: [],
		chosenAssignments: [],
		date: moment()
	}

	componentDidMount(){
		this.props.getDashboardInfo(this.props.teacher.id)
	}

	chooseStudent = (event, data) => {
		this.setState({chosenStudents: data.value})
	}

	chooseAssignment = (event, data) => {
		this.setState({chosenAssignments: data.value})
	}

	assignAssignment = () => {
		const {chosenStudents, chosenAssignments} = this.state
		if (chosenAssignments && chosenStudents){
			this.props.assign(this.state.chosenStudents, this.state.chosenAssignments, this.state.date)
			.then(messages => {
				if (messages){
					messages.forEach( message =>{
					this.msg.error(message)	
					})
				}
			})
		} else {
			this.msg.error("Please enter a student and an assignment!")	
		}
	}

	handleDateChange = (date) =>{
		this.setState({date: date})
	}


	chooseFilter = (event, data) => {
		this.setState({[data.name]: data.value})
	}

	toggle = (name) =>{
		this.setState({[name]: !this.state[name]})
	}

	applyFilter = () =>{
		let filteredAssignments = this.props.studentAssignments.slice()

		if (this.state.filterByStudent) {
			filteredAssignments = filteredAssignments.filter(assignment => assignment.issued_assignments.details.student_id == this.state.studentFilter)
		}
		if (this.state.filterByAssignment) {
			filteredAssignments = filteredAssignments.filter(assignment => assignment.issued_assignments.assignment_details.id == this.state.assignmentFilter)
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
		return this.state.filterByStatus || this.state.filterBySubject || this.state.filterByStudent || this.state.filterByAssignment
	}


	render(){

		let assignments = this.props.studentAssignments

		let gradedAssignments = assignments.filter(assignment => assignment.issued_assignments.details.status === "Graded")

		console.log(gradedAssignments)

		if (this.shouldApplyFilter()){
			assignments = this.applyFilter()
		}

		return (
			<Grid centered columns={2}>
				<Grid.Row>
					<Grid.Column width={5}>
						<Card fluid>
							<TeacherDashControls date={this.state.date} 
												 handleDateChange={this.handleDateChange} 
												 students={this.props.students} 
												 assign={this.assignAssignment} 
												 chooseAssignment={this.chooseAssignment} 
												 chooseStudent={this.chooseStudent} 
												 assignments={this.props.assignments} 
												 chooseFilter={this.chooseFilter}
												 toggle={this.toggle}
												 filterByStudent= {this.state.filterByStudent}
												 filterByAssignment= {this.state.filterByAssignment}
												 filterBySubject= {this.state.filterBySubject}	
												 filterByStatus= {this.state.filterByStatus}/>
						</Card>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid style={{height: "500px", overflow:"auto"}}>
							<AssignmentTable users={this.props.students} assignments={assignments}/>
						</Card>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column width={12}>
						<BarChart students={this.props.students} assignments={this.props.assignments} studentAssignments={gradedAssignments}/>
					</Grid.Column>
				</Grid.Row>

				<AlertContainer ref={a => this.msg = a} {...alertOptions} />
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

		assign: (students, assignments, dueDate) => {
			return dispatch(assign(students, assignments, dueDate))
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(TeacherDash)