import React from 'react'
import {Card, Rating, Form, Segment} from 'semantic-ui-react'

const ActiveAssignmentDetails = ({details, start, started, openModal, over, seeResults, readOnly, loaded, copyAssignment})=>{

	const {grade, difficulty, subject, title, time, timed, total_points} = details
	return (
		<Card>
			<Card.Header textAlign="center"><h4>{title}</h4></Card.Header>
			<Card.Content>
				<p><strong>Grade level: </strong>{grade}</p>
				<p><strong>Subject: </strong>{subject}</p>
				<p><strong>Total time: </strong>{timed ? `${time} minutes` : "Untimed"}</p>
				<p><strong>Total points: </strong>{total_points} points</p>
				<p><strong>Difficulty: </strong><Rating icon='star' disabled defaultRating={difficulty} maxRating={5} /></p>
				<Segment>
					<Form>
						{started ? <Form.Button fluid color="orange" disabled={over || readOnly} onClick={openModal}>submit</Form.Button> : <Form.Button onClick={start} disabled={!loaded} fluid color="teal">{readOnly ? "view"  : "start"}</Form.Button>}
						{over ? <Form.Button fluid color="teal" onClick={seeResults}>see results</Form.Button> : null}
						{readOnly ? <Form.Button onClick={copyAssignment} fluid color="orange">copy assignment</Form.Button> : null}
					</Form>
				</Segment>
			</Card.Content>
		</Card>
	)
}

export default ActiveAssignmentDetails