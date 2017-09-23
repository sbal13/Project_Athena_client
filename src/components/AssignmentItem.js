import React from 'react'
import {Segment, Rating, Button} from 'semantic-ui-react'


const AssignmentItem = ({details, visitAssignment}) => {

	const {description, grade, subject, difficulty, time, timed, total_points, id} = details

	const handleClick = (event) => {
		visitAssignment(event.target.name)
	}

	return (
		<Segment>
			<p>Description: {description}</p>
			<p>Grade: {grade}</p>
			<p>Subject: {subject}</p>
			<p>Difficulty: </p><Rating icon='star' disabled defaultRating={difficulty} maxRating={5} />
			<p>Time: {timed ? `${time} minutes` : "untimed"}</p>
			<p>Total points: {total_points} points</p>
			<Button onClick={handleClick} name={id}>Try Assignment</Button>
		</Segment>
	)
}


export default AssignmentItem