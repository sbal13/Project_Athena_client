import React from 'react'
import {Grid, Card, Modal, Button} from 'semantic-ui-react'
import ActiveQuestion from './ActiveQuestion'
import ActiveAssignmentDetails from './ActiveAssignmentDetails'
import Timer from './Timer'
import {connect} from 'react-redux'
import {submitAssignment, getStudentAssignments, copyAssignment} from '../actions/assignments'
import {alertOptions} from '../helpers/AlertOptions'
import AlertContainer from 'react-alert'

class ActiveTest extends React.Component {

	state = {
		started: false,
		over: false,
		questionsAnswered: 0,
		timeRemaining: 0,
		timer: null,
		selectedAnswers: [],
		open: false,
		loaded: false
	}

	startAssignment = () => {
		const emptyArray = this.props.assignment.questions.map(q => "")


		const completedAssignments = this.props.issuedAssignments.filter(assignment => assignment.issued_assignments.details.status === "Graded" || assignment.issued_assignments.details.status === "Submitted")
		const pendingAssignments = this.props.issuedAssignments.filter(assignment => assignment.issued_assignments.details.status === "Pending")

		const alreadyCompleted = !!completedAssignments.find(assignment => {
			return assignment.issued_assignments.assignment_details.id === this.props.assignment.details.id
		})

		const beenAssigned = !!pendingAssignments.find(assignment => {
			return assignment.issued_assignments.assignment_details.id === this.props.assignment.details.id
		})

		if (alreadyCompleted){
			this.msg.info("You've already completed this assignment!")
		} else if (!beenAssigned && this.isStudent()) {
			this.msg.info("You have not yet been assigned this assignment!")
		} else {
			const shouldStartTimer = this.isTimed() && this.isStudent() ? setInterval(this.tick, 1000) : null
			this.setState({
				timer: shouldStartTimer, 
				started: true, 
				timeRemaining: this.props.assignment.details.time*60,
				selectedAnswers: emptyArray
			})
		}
	}

	isStudent = ()=>{
		return this.props.currentUser.user_type === "student"
	}

	isTimed = ()=>{
		return this.props.assignment.details.timed
	}


	finalize = () => {
		clearInterval(this.state.timer)
		this.setState({over: true, open:false})
	}

	tick = () => {
		let newTime = --this.state.timeRemaining

		if (newTime < 0){
			newTime = 0
			this.submitAssignment()
		}

		this.setState({timeRemaining: newTime})
	}

	submitAssignment = () => {
		this.finalize()
		this.props.submit(this.state.selectedAnswers, this.props.assignment.details.id)
	}

	selectAnswer = (questionNum, choice) => {

		const newSelected = this.state.selectedAnswers.slice()

		newSelected[questionNum] = choice

		this.setState({selectedAnswers: newSelected})
	}

	closeModal = () => {
		this.setState({open: false})
	}

	openModal = () => {
		this.setState({open: true})
	}

	seeResults = () => {
		this.props.history.push('/dashboard', this.props.assignment.details.id)
	}

	componentWillUpdate(nextProps){
		if (this.props.currentUser.id !== nextProps.currentUser.id){
			this.props.getAssignments(nextProps.currentUser.id)
			.then(res => this.setState({loaded: true}))
		}
	}	

	componentWillMount(){
		if (this.props.currentUser.id){
			this.props.getAssignments(this.props.currentUser.id)
			.then(res => this.setState({loaded: true}))
		}
	}

	componentWillUnmount(){
		clearInterval(this.state.timer)
	}

	copyAssignment = () => {
		this.props.copyAssignment(this.props.assignment.details.id)
		.then(res => this.props.history.push('/dashboard'))
	}

	render(){

		const {details, questions} = this.props.assignment
		console.log(this.state)
		return (
		<div>
			<Grid  centered columns={2} style={{top: "10%"}} >
				<Grid.Column width={10}>
					{this.state.started ? questions.map((question, index)=> {
							return <ActiveQuestion key={index} 
												   questionNum={index} 
												   selectedAnswer={this.state.selectedAnswers[index]} 
												   selectAnswer={this.selectAnswer} 
												   questionDetails={question}
												   over={this.state.over}/>
					}) : null }
				</Grid.Column>
				<Grid.Column width={4}>
					<Card.Group style={{position: "fixed", top: "10%"}}>
						{!details ? <Card/> : <ActiveAssignmentDetails details={details} 
																	   seeResults = {this.seeResults} 
																	   openModal={this.openModal} 
																	   submit={this.submitAssignment}
																	   questions={questions} 
																	   over={this.state.over} 
																	   start={this.startAssignment} 
																	   started={this.state.started}
																	   readOnly={!this.isStudent()}
																	   loaded={this.state.loaded}
																	   copyAssignment={this.copyAssignment}/>}

						{this.state.started && this.isTimed() && this.isStudent() ? <Timer timeRemaining={this.state.timeRemaining}/> : null}
					</Card.Group>
				</Grid.Column>
			</Grid>

			<Modal open={this.state.open}
				   closeOnEscape={false}
				   closeOnRootNodeClick={false}
				   onClose={this.closeModal}>
				<Modal.Header>
					Submit Assignment
				</Modal.Header>
				<Modal.Content>
					<p>Are you sure you want to submit?</p>
				</Modal.Content>
				<Modal.Actions>
					<Button positive onClick={this.submitAssignment} labelPosition='right' icon='checkmark' content='submit assignment' />
					<Button negative onClick={this.closeModal} labelPosition='right' icon='remove' content='back to assignment' />
				</Modal.Actions>
			</Modal>
			<AlertContainer ref={a => this.msg = a} {...alertOptions} />

		</div>
		)
	}
}
function mapStateToProps (state){
	return {
		currentUser: state.auth.currentUser,
		issuedAssignments: state.assignment.studentAssignments
	}
}

function mapDispatchToProps(dispatch){
	return {
		submit: (answers, assignmentId)=>{
			dispatch(submitAssignment(answers, assignmentId))
		},
		getAssignments: (studentId) => {
			return dispatch(getStudentAssignments(studentId))
		},
		copyAssignment: (assignmentId) => {
			return dispatch(copyAssignment(assignmentId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTest)