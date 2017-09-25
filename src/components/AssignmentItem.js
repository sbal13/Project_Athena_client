import React from 'react'
import {Rating, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'


const AssignmentItem = ({details, visitAssignment, currentUser}) => {

	const {description, grade, subject, difficulty, time, timed, total_points, id} = details


	const handleClick = (event) => {
		visitAssignment(event.target.name)
	}

	return (
		<div>
			<p>Description: {description}</p>
			<p>Grade: {grade}</p>
			<p>Subject: {subject}</p>
			<p>Difficulty: </p><Rating icon='star' disabled defaultRating={difficulty} maxRating={5} />
			<p>Time: {timed ? `${time} minutes` : "untimed"}</p>
			<p>Total points: {total_points} points</p>
			<Button color="teal" onClick={handleClick} name={id}>{currentUser.user_type==="teacher" ? "View" : "Try"} Assignment</Button>
		</div>
	)
}

function mapStateToProps (state){
	return {
		currentUser: state.auth.user
	}
}


export default connect(mapStateToProps)(AssignmentItem)