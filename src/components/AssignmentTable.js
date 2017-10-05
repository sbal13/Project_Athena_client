import React from 'react'
import {Table, Button} from 'semantic-ui-react'
import Moment from 'react-moment';
import {deleteAssigned} from '../actions/assignments'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import moment from 'moment'


const AssignmentTable = ({assignments, isStudent, users, goToAssignment, deleteAssigned}) =>{

	const handleDelete = (event) => {
		let assignedId = parseInt(event.target.name.split("-")[1],10)
		deleteAssigned(assignedId)
	}
	return(
			 <Table celled padded>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>{isStudent ? "Teacher" : "User"}</Table.HeaderCell>
			        <Table.HeaderCell>Title</Table.HeaderCell>
			        <Table.HeaderCell>Subject</Table.HeaderCell>
			        <Table.HeaderCell>Type</Table.HeaderCell>
			        <Table.HeaderCell>Date Assigned</Table.HeaderCell>
			        <Table.HeaderCell>Due Date</Table.HeaderCell>
			        <Table.HeaderCell>Status</Table.HeaderCell>
			        <Table.HeaderCell>Final Score</Table.HeaderCell>
			        <Table.HeaderCell>Actions</Table.HeaderCell>

			      </Table.Row>
			    </Table.Header>	
			    <Table.Body>
			    	{assignments.map((assignment,index) =>{
			    		const {assignment_details, details} = assignment.issued_assignments
			    		const percentage = Math.round(details.final_score/assignment_details.total_points*100)
			    		const score = details.status === "Graded" ? `${details.final_score}/${assignment_details.total_points} (${percentage}%)` : "Ungraded"
			    		

			    		const viewButton =  <Link to={`/submitted/${details.id}`}><Button fluid color="teal" name={assignment_details.id}>view</Button></Link>
			    		const finishGradingButton = <Link to={`/submitted/${details.id}`}><Button fluid color="orange" name={assignment_details.id}>finish grading</Button></Link>

			    		const teacherActionsButton = details.status === "Submitted" ? finishGradingButton : viewButton
			    		const studentActionsButton = details.status === "Pending" ? <Button onClick={goToAssignment} fluid color="orange" name={assignment_details.id}>do assignment</Button> : viewButton 
			    		const deleteButton = <Button onClick={handleDelete} fluid name={`assigned-${details.id}`}color="red">delete</Button>

			    		let user;

			    		if (isStudent){
			    			user = users.find(user => user.id === assignment_details.teacher_id)
			    		} else {
			    			user = users.find(user => user.id === details.student_id)
			    		}

			    		const color = index%2===0 ?  "rgba(200,200,200,0.2)" : "white"
			    		
			    		if (user){
				    	return(
					    	<Table.Row key={index} style={{backgroundColor: color}}>
						        <Table.Cell><Link to={`user/${user.id}`}>{user.username}</Link></Table.Cell>
						        <Table.Cell>{(assignment_details.historical && !isStudent ? assignment_details.title + ` (ARCHIVED ${moment(assignment_details.created_at).format("MM/DD/YYYY")})` : assignment_details.title)}</Table.Cell>
						        <Table.Cell>{assignment_details.subject}</Table.Cell>
						        <Table.Cell>{assignment_details.assignment_type}</Table.Cell>
						        <Table.Cell><Moment format="MM/DD/YYYY (dddd)" date={details.assigned_date}/></Table.Cell>
						        <Table.Cell><Moment format="MM/DD/YYYY (dddd)" date={details.due_date}/></Table.Cell>
						        <Table.Cell>{details.status}</Table.Cell>
						        <Table.Cell>{score}</Table.Cell>
						        <Table.Cell>{isStudent ? studentActionsButton : teacherActionsButton}{isStudent ? null : deleteButton}</Table.Cell>
					    	</Table.Row>
						)
				    	} else {
				    		return null
				    	}
					})}
			    </Table.Body>
			</Table>
		)
}

function mapDispatchToProps (dispatch){
	return {
		deleteAssigned: (assignedId) => {
			dispatch(deleteAssigned(assignedId))
		}
	}
}

export default connect(null, mapDispatchToProps)(AssignmentTable)