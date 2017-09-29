import React from 'react'
import {Card, Form} from 'semantic-ui-react'

const ActiveQuestion = ({questionDetails, questionNum, selectedAnswer, over, selectAnswer, readOnly})=>{


	const handleChange = (event) => {
		if (!readOnly){
			if (event.target.value === selectedAnswer) {
					selectAnswer(questionNum, "")
				} else {
					selectAnswer(questionNum, event.target.value)
				}
		}
	}



	let {question, choices} = questionDetails
	choices = choices || []

	const choiceComponents = choices.map((choice, index)=> {
		return <Form.Button size="large" disabled={over} color={choice === selectedAnswer ? "blue" : null} onClick={handleChange} value={choice} key={index}>{choice}</Form.Button>
	})

	const openEndedComponent = questionDetails.question_type === "open ended" ? <Form.TextArea disabled={over} value={selectedAnswer} onChange={handleChange}/> : null

	const essayComponent = questionDetails.question_type === "essay" ? <Form.TextArea disabled={over} rows={30} value={selectedAnswer} onChange={handleChange}/> : null

	return (
		<Card fluid>
			<Card.Header >
				<h2>{`${questionNum + 1}.`}</h2>
				
			</Card.Header>
			<Card.Content>
				<h3>{question}</h3>
				<Form>
					{choiceComponents}
					{openEndedComponent}
					{essayComponent}
				</Form>
			</Card.Content>
		</Card>

	)
}

export default ActiveQuestion