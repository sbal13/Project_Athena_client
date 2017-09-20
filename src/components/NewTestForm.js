import React from 'react';
import QuestionForm from './QuestionForm'
import {Form, Button, Grid} from 'semantic-ui-react'

class NewTestForm extends React.Component {
	state = {
		questions: [{
			question: "",
			answer: "",
			choices: [""]
		}]
	}

	addQuestion = () => {
		this.setState({
			questions: [...this.state.questions, {question: "",answer: "",choices: [""]}]
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



	handleChange = (questionNumber, name, value) => {
		
		const newQuestions = this.state.questions.slice()

		if (name.includes("choices")){

			const splitName = name.split("-")
			const newChoices = this.state.questions[questionNumber].choices.slice()
			const index = parseInt(splitName[1])
			newChoices[index] = value

			newQuestions[questionNumber].choices = newChoices

			
		} else {

			newQuestions[questionNumber][name] = value
		}

		this.setState({questions: newQuestions})
	}


	createAssignment = (event) => {
		event.preventDefault()
	}
	
	render(){

		let questionComponents = this.state.questions.map((question,index) => {
			return  <QuestionForm key={index}
								  question={question.question}
								  handleChange={this.handleChange}
								  addChoice={this.addChoice}
								  questionNumber={index} 
								  answer={question.answer} 
								  changeAnswer={this.changeAnswer}
								  choices={question.choices}
								  deleteQuestion={this.deleteQuestion}
								  deleteChoice={this.deleteChoice}
								  />

		})
		
		console.dir(this.state)

		return (
		<div>
			<Form onSubmit={this.createAssignment}>
				<Grid centered columns={1}>
					{questionComponents}
					<Grid.Row>
						<Form.Button>Create Assignment</Form.Button>
						<Form.Button onClick={this.addQuestion}>Add Question</Form.Button>
					</Grid.Row>
				</Grid>
				
			</Form>
			
		</div>
			
	)}
}

export default NewTestForm