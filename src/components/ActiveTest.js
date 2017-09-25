import React from 'react'
import {Grid, Card, Modal, Button} from 'semantic-ui-react'
import ActiveQuestion from './ActiveQuestion'
import ActiveAssignmentDetails from './ActiveAssignmentDetails'
import Timer from './Timer'
import {connect} from 'react-redux'
import {submitAssignment} from '../actions/assignments'

class ActiveTest extends React.Component {

	state = {
		started: false,
		over: false,
		questionsAnswered: 0,
		timeRemaining: 0,
		timer: null,
		selectedAnswers: [],
		open: false
	}

	startAssignment = () => {
		const emptyArray = this.props.assignment.questions.map(q => "")

		const shouldStartTimer = this.isTimed() && this.isStudent() ? setInterval(this.tick, 1000) : null

		this.setState({
			timer: shouldStartTimer, 
			started: true, 
			timeRemaining: this.props.assignment.details.time*60,
			selectedAnswers: emptyArray
		})
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
		console.log("Question: ", questionNum)
		console.log("Selected: ", choice )

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
		this.props.history.push('/profile', this.props.assignment.details.id)
	}



	componentWillUnmount(){
		clearInterval(this.state.timer)
	}

	render(){

		const {details, questions} = this.props.assignment


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
							})
						: null }
				</Grid.Column>
				<Grid.Column width={4}>
					<Card.Group style={{position: "fixed", top: "10%"}}>
						{!details ? <Card/> : <ActiveAssignmentDetails details={details} 
																	   seeResults = {this.seeResults} 
																	   openModal={this.openModal} 
																	   submit={this.submitAssignment} 
																	   over={this.state.over} 
																	   start={this.startAssignment} 
																	   started={this.state.started}
																	   readOnly={!this.isStudent()}/>}

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
		</div>
		)
	}
}
function mapStateToProps (state){
	return {
		currentUser: state.auth.currentUser
	}
}

function mapDispatchToProps(dispatch){
	return {
		submit: (answers, assignmentId)=>{
			dispatch(submitAssignment(answers, assignmentId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTest)