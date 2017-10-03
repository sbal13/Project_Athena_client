import React from 'react'
import {Rating, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteAssignment} from '../actions/assignments'


const AssignmentItem = ({details, visitAssignment, currentUser, deleteAssignment}) => {

	const {description, grade, subject, difficulty, time, timed, total_points, id, teacher_id, historical} = details


	const handleClick = (event) => {
		visitAssignment(event.target.name)
	}

	const handleDelete = () => {
		deleteAssignment(id)
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
			{teacher_id === currentUser.id && !historical ? <Link to={`/assignment/${id}/edit`}><Button color="orange">Edit</Button></Link> : null}
			{teacher_id === currentUser.id ? <Button onClick={handleDelete} color="red">Delete</Button> : null}
		</div>
	)
}

function mapStateToProps (state){
	return {
		currentUser: state.auth.currentUser
	}
}
function mapDispatchToProps (dispatch){
	return {
		deleteAssignment: (assignmentId) => {
			dispatch(deleteAssignment(assignmentId))
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(AssignmentItem)