import React from 'react'
import {Card, Button, Label} from 'semantic-ui-react'

const ActiveQuestion = ({questionDetails, ended, questionNum, selectedAnswer, over, selectAnswer})=>{


	const handleSelect = (event) => {
		selectAnswer(questionNum, event.target.value)
	}

	const {question, choices, point_value} = questionDetails

	const choiceComponents = choices.map((choice, index)=> {
		return <Button size="large" disabled={over} color={choice === selectedAnswer ? "blue" : null}onClick={handleSelect} value={choice} key={index}>{choice}</Button>
	})


	return (
		<Card fluid>
			<Card.Header>
				<h3>{`Question ${questionNum + 1} - (${point_value} points)`}</h3>
				
			</Card.Header>
			<Card.Content>
				<h3>{question}</h3>
				{choiceComponents}
			</Card.Content>
		</Card>
	)
}

export default ActiveQuestion