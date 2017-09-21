import React from 'react'
import {Form, Button, Grid, Card, Input, Label} from 'semantic-ui-react'


class QuestionForm extends React.Component{

	handleChange = (event) =>{
		this.props.handleChange(this.props.questionNumber, event.target.name, event.target.value)
	}

	addChoice = () =>{
		this.props.addChoice(this.props.questionNumber)
	}

	changeAnswer = (event,data) => {
		const choiceNumber = parseInt(data.name.split("-")[0], 10)
		this.props.changeAnswer(this.props.questionNumber, choiceNumber )	
	}

	deleteQuestion = () => {
		this.props.deleteQuestion(this.props.questionNumber)
	}

	deleteChoice = (event) => {
		const choiceNumber = parseInt(event.target.name.split("-")[0], 10)
		this.props.deleteChoice(this.props.questionNumber, choiceNumber)
	}

	render(){

		let choices = this.props.choices.map((choice, index) => {
			return (
				<Card fluid key={index}>
					<Card.Header textAlign="center">{`Choice ${index+1}`}<Button floated="right" style={{background: "#820c0c", color: "white"}} size="tiny" name={`${index}-delete`} onClick={this.deleteChoice}>X</Button></Card.Header>

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

						
					</Card.Content>
				</Card>
		)})	

		return(
			<Grid.Row>
				<Grid.Column>
					<Card fluid raised>
						<Card.Header textAlign="center">
							<Button floated="left" color="blue" onClick={this.addChoice}>{`Add Choice to Question ${this.props.questionNumber+1}`}</Button>
							<Button floated="right" color="orange" onClick={this.deleteQuestion}>Delete Question</Button>
						</Card.Header>
						<Card.Content>
							<Grid centered columns={2}>
								<Grid.Row>
									<Grid.Column width={14}>
										<label>Question</label>
										<Form.TextArea onChange={this.handleChange} 
											   name="question" 
											   autoHeight
											   rows={1}
											   value={this.props.question}/>
									</Grid.Column>
									<Grid.Column width={2} verticalAlign="bottom">
										<Input  fluid labelPosition='left' 
										       type='number'>
										       	<Label>Points</Label>
										    	<input
												   onChange={this.handleChange} 
												   name="points" 
												   value={this.props.points}/>
										</Input>
									</Grid.Column>
								</Grid.Row>
								<Grid.Row>
									<Grid.Column width={16}>
										<Card.Group itemsPerRow={4}>
											{choices}
										</Card.Group>
									</Grid.Column>
								</Grid.Row>

							</Grid>
							</Card.Content>
					</Card>
				</Grid.Column>
			</Grid.Row>
	)}
}

export default QuestionForm