import React from 'react'
import {Card, Rating, Button} from 'semantic-ui-react'

const ActiveAssignmentDetails = ({details, start, started, openModal, over, seeResults, readOnly, loaded})=>{

	const {description, grade, difficulty, subject, title, time, timed, total_points} = details
	return (
		<Card>
			<Card.Header>{title}</Card.Header>
			<Card.Content>
				<p>Description: {description}</p>
				<p>Grade level: {grade}</p>
				<p>Subject: {subject}</p>
				<p>Total time: {timed ? `${time} minutes` : "Untimed"}</p>
				<p>Total points: {total_points} points</p>
				<p>Difficulty: </p><Rating icon='star' disabled defaultRating={difficulty} maxRating={5} />
			</Card.Content>
			{started ? <Button color="orange" disabled={over || readOnly} onClick={openModal}>finished!</Button> : <Button onClick={start} disabled={!loaded} color="teal">{readOnly ? "view"  : "start!"}</Button>}
			{over ? <Button color="teal" onClick={seeResults}>see results</Button> : null}
		</Card>
	)
}

export default ActiveAssignmentDetails