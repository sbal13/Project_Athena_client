import React from 'react'
import {Form, Button, Grid, Card, Checkbox} from 'semantic-ui-react'


class QuestionForm extends React.Component{

	handleChange = (event) =>{
		this.props.handleChange(this.props.questionNumber, event.target.name, event.target.value)
	}

	addChoice = () =>{
		this.props.addChoice(this.props.questionNumber)
	}

	changeAnswer = (event,data) => {
		const choiceNumber = parseInt(data.name.split("-")[0])
		this.props.changeAnswer(this.props.questionNumber, choiceNumber )	
	}

	deleteQuestion = () => {
		this.props.deleteQuestion(this.props.questionNumber)
	}

	deleteChoice = (event) => {
		const choiceNumber = parseInt(event.target.name.split("-")[0])
		this.props.deleteChoice(this.props.questionNumber, choiceNumber)
	}

	render(){

		let choices = this.props.choices.map((choice, index) => {
			return (
				<Card fluid key={index}>
					<Card.Header textAlign="center">{`Choice ${index+1}`}</Card.Header>

					<Card.Content>
						<Form.TextArea onChange={this.handleChange}
									   autoHeight
						      		   name={`choices-${index}`} 
								   	   rows={2}
						               value={choice}/>
						<Button toggle
								circular
								active = {!!(this.props.answer === choice && this.props.answer)}
							    label="Answer"
					   		    name={`${index}-set-answer`}
					            onClick={this.changeAnswer}/>

						<Button floated="right" color="red" size="small" name={`${index}-delete`} onClick={this.deleteChoice}>X</Button>
					</Card.Content>
				</Card>
		)})	

		return(
			<Grid.Row>
				<Grid.Column width={9}>
					<Card fluid raised>
						<Card.Content textAlign="center" header = {`Question #${this.props.questionNumber+1}`}/>
						<Card.Content>
							<label>Question</label>
							<Form.TextArea onChange={this.handleChange} 
										   name="question" 
										   autoHeight
										   rows={2}
										   value={this.props.question}/>
							<Grid centered columns={1}>
								<Grid.Row>
									<Grid.Column>
										<Card.Group itemsPerRow={3}>
											{choices}
										</Card.Group>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row>
									<Button onClick={this.addChoice}>{`Add Choice to Question ${this.props.questionNumber+1}`}</Button>
									<Button onClick={this.deleteQuestion}>Delete Question</Button>
								</Grid.Row>
							</Grid>
							</Card.Content>
					</Card>
				</Grid.Column>
			</Grid.Row>
	)}
}

export default QuestionForm