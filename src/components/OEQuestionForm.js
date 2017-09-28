import React from 'react'
import {Form, Button, Grid, Card, Input, Label} from 'semantic-ui-react'


class OEQuestionForm extends React.Component{

	handleChange = (event) =>{
		this.props.handleChange(this.props.questionNumber, event.target.name, event.target.value)
	}

	deleteQuestion = () => {
		this.props.deleteQuestion(this.props.questionNumber)
	}

	render(){


		return(
			<Grid.Row>
				<Grid.Column>
					<Card fluid raised>
						<Card.Header textAlign="center">
							<Button floated="right" color="orange" onClick={this.deleteQuestion}>Delete Question</Button>
						</Card.Header>
						<Card.Content>
							<Grid centered columns={2}>
								<Grid.Row>
									<Grid.Column width={13}>
										<label>Question</label>
										<Form>
											<Form.TextArea onChange={this.handleChange} 
												   name="question" 
												   autoHeight
												   rows={2}
												   value={this.props.question}/>
										</Form>
									</Grid.Column>
									<Grid.Column width={3} verticalAlign="bottom">
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
							</Grid>
							</Card.Content>
					</Card>
				</Grid.Column>
			</Grid.Row>
	)}
}

export default OEQuestionForm