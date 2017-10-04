import React from 'react'
import {Rating, Button ,Table} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteAssignment} from '../actions/assignments'


const AssignmentItem = ({details, visitAssignment, currentUser, creator, deleteAssignment}) => {

	const {description, grade, subject, difficulty, time, timed, total_points, id, teacher_id, historical} = details


	const handleClick = (event) => {
		visitAssignment(event.target.name)
	}

	const handleDelete = () => {
		deleteAssignment(id)
	}

	return (
		<div>
			<Table celled padded>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>Description</Table.HeaderCell>
			        <Table.HeaderCell>Grade</Table.HeaderCell>
			        <Table.HeaderCell>Subject</Table.HeaderCell>
			        <Table.HeaderCell>Difficulty</Table.HeaderCell>
			        <Table.HeaderCell>Time</Table.HeaderCell>
			        <Table.HeaderCell>Points</Table.HeaderCell>
			        {creator ? <Table.HeaderCell>Creator</Table.HeaderCell> : null}
			        <Table.HeaderCell>Actions</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>	
			    <Table.Body>
			    	<Table.Row>
			    		<Table.Cell>{description}</Table.Cell>
			    		<Table.Cell>{grade}</Table.Cell>
			    		<Table.Cell>{subject}</Table.Cell>
			    		<Table.Cell><Rating icon='star' disabled defaultRating={difficulty} maxRating={5} /></Table.Cell>
			    		<Table.Cell>{timed ? `${time} minutes` : "untimed"}</Table.Cell>
			    		<Table.Cell>{total_points} points</Table.Cell>
			    		{creator ? <Table.Cell><Link to={`/user/${creator.id}`}>{creator.username}</Link></Table.Cell> : null}
			    		<Table.Cell><Button color="teal" onClick={handleClick} name={id}>{currentUser.user_type==="teacher" ? "view" : "do"} assignment</Button>
			{teacher_id === currentUser.id && !historical ? <Link to={`/assignment/${id}/edit`}><Button color="orange">edit</Button></Link> : null}
			{teacher_id === currentUser.id ? <Button onClick={handleDelete} color="red">delete</Button> : null}</Table.Cell>
			    	</Table.Row>
			    </Table.Body>
			</Table>
			
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