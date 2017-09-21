import React from 'react';
import QuestionForm from './QuestionForm'
import {validateTest} from '../validators/validateTest'
import {connect} from 'react-redux'

import {ASSIGNMENT_TYPES, GRADES, SUBJECTS} from '../constants'
import {newAssignment} from '../actions/assignments'
import {Form, Grid, Card, Segment, Button, Select, Rating, TextArea, Input, Label} from 'semantic-ui-react'

class NewTestForm extends React.Component {
	state = {
		questions: [{
			question: "",
			answer: "",
			points: 0,
			choices: [""]
		}],
		difficulty: 0,
		subject: "",
		description: "",
		assignmentType: "",
		grade: "",
		timed: false,
		time: 0
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
		this.props.create(this.state, this.props.history)
	}

	toggleTime = () => {
		this.setState({timed: !this.state.timed})
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

		const valid = validateTest(this.state)
		return (
		<div>
			<Form>
				<Grid columns={3}>
					<Grid.Column width={1}/>

					<Grid.Column width={11}>
						<Grid>
							{questionComponents}
						</Grid>
					</Grid.Column>

					<Grid.Column width={4}>

						<Card style={{position: "fixed", top: "20%"}}>
							<Card.Header>assignment details</Card.Header>
							<Card.Content>
								<TextArea name="description" 
										  value={this.state.description} 
										  rows={5}
										  onChange={this.handleAssignmentDetailChange}
										  placeholder="describe this assignment"/>
								<Select options={ASSIGNMENT_TYPES} 
										placeholder="assignment type"
										name="assignmentType"
										fluid
										onChange={this.handleSelection}/>
								<Select options={SUBJECTS} 
										placeholder="subject"
										name="subject"
										fluid
										onChange={this.handleSelection}/>
								<Select options={GRADES} 
										placeholder="grade"
										name="grade"
										fluid
										onChange={this.handleSelection}/>
								<Segment>
									
									<Input labelPosition='right' fluid type='number' placeholder='Time'>
										<Button toggle active={this.state.timed} onClick={this.toggleTime}>Timed</Button>
										<input onChange={this.handleAssignmentDetailChange} name="time" value={this.state.time}/>
										<Label>mins</Label>
									</Input>
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
							<Button fluid color={valid ? "green" : null} disabled={!valid} onClick={this.createAssignment}>Create Assignment</Button>
						</Card>
					</Grid.Column>
				</Grid>
				
			</Form>
			
		</div>
			
	)}
}


function mapDispatchToProps(dispatch){
	return {create: (assignmentData, history) => {
			dispatch(newAssignment(assignmentData, history))
		}
	}
}	

export default connect(null, mapDispatchToProps)(NewTestForm)