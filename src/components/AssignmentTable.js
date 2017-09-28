import React from 'react'
import {Table, Button} from 'semantic-ui-react'
import Moment from 'react-moment';
import {Link} from 'react-router-dom'


const AssignmentTable = ({assignments, isStudent, users, goToAssignment}) =>{

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
			    		

			    		const viewButton =  <Link to={`/submitted/${details.id}`}><Button name={assignment_details.id}>view</Button></Link>
			    		const finishGradingButton = <Link to={`/submitted/${details.id}`}><Button name={assignment_details.id}>finish grading</Button></Link>

			    		const teacherActionsButton = details.status === "Submitted" ? finishGradingButton : viewButton
			    		const studentActionsButton = details.status === "Pending" ? <Button onClick={goToAssignment} name={assignment_details.id}>do assignment</Button> : viewButton 
			    		
			    		let user;

			    		if (isStudent){
			    			user = users.find(user => user.id === assignment_details.teacher_id)
			    		} else {
			    			user = users.find(user => user.id === details.student_id)
			    		}
				    	return(
					    	<Table.Row key={index}>
						        <Table.Cell><Link to={`user/${user.id}`}>{user.username}</Link></Table.Cell>
						        <Table.Cell>{assignment_details.title}</Table.Cell>
						        <Table.Cell>{assignment_details.subject}</Table.Cell>
						        <Table.Cell>{assignment_details.assignment_type}</Table.Cell>
						        <Table.Cell><Moment format="MM/DD/YYYY (dddd)" date={details.assigned_date}/></Table.Cell>
						        <Table.Cell><Moment format="MM/DD/YYYY (dddd)" date={details.due_date}/></Table.Cell>
						        <Table.Cell>{details.status}</Table.Cell>
						        <Table.Cell>{score}</Table.Cell>
						        <Table.Cell>{isStudent ? studentActionsButton : teacherActionsButton}</Table.Cell>
					    	</Table.Row>
					)})}
			    </Table.Body>
			</Table>
		)
}

export default AssignmentTable