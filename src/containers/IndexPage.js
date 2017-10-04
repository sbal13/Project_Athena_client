import React from 'react'
import AssignmentList from '../components/AssignmentList'
import {connect} from 'react-redux'
import {getAllAssignments} from '../actions/assignments'
import {Grid, Card} from 'semantic-ui-react'
import IndexControl from '../components/IndexControl'


class IndexPage extends React.Component {

	state = {
		gradeFilter: null,
		subjectFilter: null,
		creatorFilter: "",
		assignmentFilter: "",
		filterByGrade: false,
		filterBySubject: false
		// applyDifficultySort: false,
		// ascending: true
	}


 	componentDidMount() {
 		if(this.props.currentUser.user_type !== "teacher") {
			this.props.history.push('/dashboard')
		} else{
    		this.props.getAssignments()
    	}
    }


    chooseFilter = (event, data) => {
		this.setState({[data.name]: data.value})
	}

	toggle = (name) =>{
		console.log(name)
		this.setState({[name]: !this.state[name]})
	}

	applyFilter = (assignments) =>{
		let filteredAssignments = assignments.slice()
		console.log(this.state.filterByCreator)
		if (this.state.filterBySubject) {
			filteredAssignments = filteredAssignments.filter(assignment => assignment.details.subject === this.state.subjectFilter)
		}

		if (this.state.filterByGrade) {
			filteredAssignments = filteredAssignments.filter(assignment => assignment.details.grade === this.state.gradeFilter)
		}
		
		filteredAssignments = filteredAssignments.filter(assignment => assignment.creator.username.toLowerCase().includes(this.state.creatorFilter.toLowerCase()))
		filteredAssignments = filteredAssignments.filter(assignment => assignment.details.title.toLowerCase().includes(this.state.assignmentFilter.toLowerCase()))

		return filteredAssignments
	}

	// applySort = (assignments) => {
	// 	let sortedAssignments = assignments.slice()

	// 	if (this.state.applyDifficultySort) {
	// 		sortedAssignments = assignments.sort((a,b) => a.details.difficulty - b.details.difficulty)
	// 	}


	// 	if (this.state.ascending) {
	// 		return sortedAssignments
	// 	} else {
	// 		return sortedAssignments.reverse()
	// 	}
	// }


	render(){

		let uniqueAssignments = this.props.allAssignments.filter(assignment => {
			return assignment.details.creator_id === assignment.details.teacher_id
		})

		let assignments = this.applyFilter(uniqueAssignments)
		return(
			<Grid centered columns={2}>
				<Grid.Column width={10}>
					<Card fluid>
						<Card.Content>
							{this.props.allAssignments.length > 0 ? <AssignmentList assignments={assignments} history={this.props.history}/> : null}
						</Card.Content>
					</Card>
				</Grid.Column>
				<Grid.Column width={4}>
					<IndexControl gradeFilter={this.state.gradeFilter}
								  toggle={this.toggle}
								  subjectFilter={this.state.subjectFilter}
								  chooseFilter={this.chooseFilter}
								  filterByGrade={this.state.filterByGrade}
								  filterBySubject={this.state.filterBySubject}
								  creatorFilter={this.state.creatorFilter}
								  assignmentFilter={this.state.assignmentFilter}
								  />
				</Grid.Column>
			</Grid>
	)}
}

function mapStateToProps(state) {
	return {
		allAssignments: state.assignment.allAssignments	
	}
}

function mapDispatchToProps(dispatch) {
	return {
		getAssignments: () => {
	       dispatch(getAllAssignments())
	    }
	}
 }

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)