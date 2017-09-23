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
		this.setState({
			timer: setInterval(this.tick, 1000), 
			started: true, 
			timeRemaining: this.props.assignment.details.time,
			selectedAnswers: emptyArray
		})
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

		console.log(this.state.selectedAnswers)
		return (
		<div>
			<Grid  centered columns={2}>
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
						{!details ? <Card/> : <ActiveAssignmentDetails details={details} seeResults = {this.seeResults} openModal={this.openModal} submit={this.submitAssignment} over={this.state.over} start={this.startAssignment} started={this.state.started}/>}
						{this.state.started ? <Timer timeRemaining={this.state.timeRemaining}/>: null}
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
					<Button positive onClick={this.submitAssignment} labelPosition='right' icon='checkmark' content='Submit' />
					<Button negative onClick={this.closeModal}>i'm not done!</Button>
				</Modal.Actions>
			</Modal>
		</div>
		)
	}
}


function mapDispatchToProps(dispatch){
	return {
		submit: (answers, assignmentId)=>{
			dispatch(submitAssignment(answers, assignmentId))
		}
	}
}

export default connect(null, mapDispatchToProps)(ActiveTest)