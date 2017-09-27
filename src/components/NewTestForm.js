import React from 'react';
import QuestionForm from './QuestionForm'
import {validateTest} from '../helpers/validateTest'
import {connect} from 'react-redux'
import {ASSIGNMENT_TYPES, GRADES, SUBJECTS} from '../helpers/constants'
import {newAssignment} from '../actions/assignments'
import {Form, Grid, Card, Segment, Button, Rating, Input, Label} from 'semantic-ui-react'
import {alertOptions} from '../helpers/AlertOptions'
import AlertContainer from 'react-alert'

class NewTestForm extends React.Component {
	state = {
		questions: [{
			question: "",
			answer: "",
			points: 0,
			choices: [""]
		}],
		title: "",
		difficulty: 0,
		subject: "",
		description: "",
		assignmentType: "",
		grade: "",
		timed: false,
		time: 0,
		protected: false
	}
	addQuestion = () => {
		this.setState({
			questions: [...this.state.questions, {question: "",answer: "", points: 0, choices: [""]}]
		})
	}

	deleteQuestion = (questionNumber) => {


		this.setState({
			questions: [...this.state.questions.slice(0, questionNumber), ...this.state.questions.slice(questionNumber+1)]
		})
	}

	changeAnswer = (questionNumber, choiceNumber) =>{
		const newQuestions = this.state.questions.slice()
		newQuestions[questionNumber].answer = newQuestions[questionNumber].choices[choiceNumber]
		this.setState({questions: newQuestions})
	}

	addChoice = (questionNumber) => {
		const newQuestions = this.state.questions.slice()

		newQuestions[questionNumber].choices.push("")


		this.setState({
			questions: newQuestions
		})
	}

	deleteChoice = (questionNumber, choiceNumber) => {
		const newQuestions = this.state.questions.slice()
		const oldChoices = newQuestions[questionNumber].choices
		newQuestions[questionNumber].choices = [...oldChoices.slice(0,choiceNumber), ...oldChoices.slice(choiceNumber+1)]

		if (newQuestions[questionNumber].answer === oldChoices[choiceNumber]){
			newQuestions[questionNumber].answer = ""
		}


		this.setState({
			questions: newQuestions
		})
	}



	handleQuestionChange = (questionNumber, name, value) => {
		
		const newQuestions = this.state.questions.slice()

		if (name.includes("choices")){

			const splitName = name.split("-")
			const newChoices = this.state.questions[questionNumber].choices.slice()
			const index = parseInt(splitName[1], 10)
			newChoices[index] = value

			newQuestions[questionNumber].choices = newChoices

			
		} else {

			newQuestions[questionNumber][name] = value
		}

		this.setState({questions: newQuestions})
	}

	handleSelection = (event, data) => {
		if (data.name === "difficulty") {
			this.setState({difficulty: data.rating})
		} else {
			this.setState({
				[data.name]: data.value
			})
		}
	}

	handleAssignmentDetailChange = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}


	createAssignment = () => {
		const validator = validateTest(this.state)
		if (validator.length === 0) {
			this.props.create(this.state, this.props.history)
		} else {
			validator.forEach(message => {
				this.msg.error(message)
			})
		}
	}

	toggleTime = () => {
		this.setState({timed: !this.state.timed})
	}

	changeProtected = () =>{
		this.setState({protected: !this.state.protected})
	}
	
	render(){

		let questionComponents = this.state.questions.map((question,index) => {
			return  <QuestionForm key={index}
								  question={question.question}
								  points={question.points}
								  handleChange={this.handleQuestionChange}
								  addChoice={this.addChoice}
								  questionNumber={index} 
								  answer={question.answer} 
								  changeAnswer={this.changeAnswer}
								  choices={question.choices}
								  deleteQuestion={this.deleteQuestion}
								  deleteChoice={this.deleteChoice}
								  />

		})

		return (
			<Grid relaxed columns={3}>
				<Grid.Column width={1}/>

				<Grid.Column width={11}>
					<Grid>
						{questionComponents}
					</Grid>
				</Grid.Column>

				<Grid.Column width={4}>

					<Card style={{position: "fixed", top: "10%"}}>
						<Card.Header>assignment details</Card.Header>
						<Card.Content>
							<Form>
							<Form.Input type="text"
								   value={this.state.title}
								   fluid
								   name="title"
								   onChange={this.handleAssignmentDetailChange}
								   placeholder="title"/>
							<Form.TextArea name="description" 
									  value={this.state.description} 
									  rows={5}
									  onChange={this.handleAssignmentDetailChange}
									  placeholder="describe this assignment"/>
							<Form.Select options={ASSIGNMENT_TYPES} 
									placeholder="assignment type"
									name="assignmentType"
									fluid
									onChange={this.handleSelection}/>
							<Form.Select options={SUBJECTS} 
									placeholder="subject"
									name="subject"
									fluid
									onChange={this.handleSelection}/>
							<Form.Select options={GRADES} 
									placeholder="grade"
									name="grade"
									fluid
									onChange={this.handleSelection}/>
							</Form>
							<Segment>
								<Form>
									<Form.Input labelPosition='right' fluid type='number' placeholder='Time'>
										<Button toggle active={this.state.timed} onClick={this.toggleTime}>Timed</Button>
										<input onChange={this.handleAssignmentDetailChange} name="time" value={this.state.time}/>
										<Label>mins</Label>
									</Form.Input>
									<Form.Button fluid toggle color={this.state.protected ? "red" : "green"} onClick={this.changeProtected}>{this.state.protected ? "Protected" : "Public"}</Form.Button>
								</Form>
							</Segment>
							<Segment>
								<strong>difficulty</strong>
								<Rating maxRating={5} 
										clearable
										icon="star"
										rating={this.state.rating}
										size="massive"
										label="difficulty"
										name="difficulty"
										onRate={this.handleSelection}/>
							</Segment>
						</Card.Content>
						<Button fluid color="teal" onClick={this.addQuestion}>Add Question</Button>
						<Button fluid color="green" onClick={this.createAssignment}>Create Assignment</Button>
					</Card>
				</Grid.Column>
				<AlertContainer ref={a => this.msg = a} {...alertOptions} />
			</Grid>
	)}
}
function mapStateToProps(state) {
	return {user: state.auth.user}
}


function mapDispatchToProps(dispatch){
	return {
		create: (assignmentData, history) => {
			dispatch(newAssignment(assignmentData, history))
		}
	}
}	

export default connect(mapStateToProps, mapDispatchToProps)(NewTestForm)