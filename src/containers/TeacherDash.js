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
import ScatterChart from '../components/ScatterChart'
import PolarChart from '../components/PolarChart'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';



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

	componentWillMount(){
		this.props.getDashboardInfo(this.props.teacher.id)
	}

	componentWillReceiveProps(nextProps){
		if (this.props.teacher.id !== nextProps.teacher.id){
			this.props.getDashboardInfo(this.props.teacher.id)
		}
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

	isLoaded = () => {
		return this.props.students.length > 0  && this.props.assignments.length > 0 && this.props.studentAssignments.length > 0
	}


	render(){

		let assignments = this.props.studentAssignments

		let gradedAssignments = assignments.filter(assignment => assignment.issued_assignments.details.status === "Graded")
		
		// let nonHistorical = this.props.assignments.filter(assignment => !assignment.details.historical)
		// let historical = this.props.assignments.filter(assignment => assignment.details.historical)


		if (this.shouldApplyFilter()){
			assignments = this.applyFilter()
		}

		return (
			<Grid centered columns={2}>
				<Grid.Row>
					<Grid.Column width={4}>
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
					<Grid.Column width={11}>
						<Card fluid style={{height: "524px", overflow:"auto"}}>
							{this.isLoaded() ? <AssignmentTable users={this.props.students} assignments={assignments}/> : null}
						</Card>
					</Grid.Column>
				</Grid.Row>

				<Grid.Row>
					<Grid.Column width={12}>
						<Tabs>
							<TabList>
								<Tab>Overall Performance</Tab>
								<Tab>Performance Over Time</Tab>
								<Tab>Student Average Performance</Tab>
							</TabList>
							<TabPanel>
								<BarChart students={this.props.students} assignments={this.props.assignments} studentAssignments={gradedAssignments}/>
							</TabPanel>
							<TabPanel>
								<ScatterChart students={this.props.students} range={this.getInitialDateRange(gradedAssignments)} studentAssignments={gradedAssignments}/>
							</TabPanel>
							<TabPanel>
								<PolarChart students={this.props.students} studentAssignments={gradedAssignments}/>
							</TabPanel>
						</Tabs>
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