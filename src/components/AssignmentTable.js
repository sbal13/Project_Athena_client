import React from 'react'
import {Table, Button} from 'semantic-ui-react'
import Moment from 'react-moment';


const AssignmentTable = ({assignments, isStudent, goToAssignment}) =>{

	return(
			 <Table celled padded>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>Title</Table.HeaderCell>
			        <Table.HeaderCell>Subject</Table.HeaderCell>
			        <Table.HeaderCell>Type</Table.HeaderCell>
			        <Table.HeaderCell>Date Assigned</Table.HeaderCell>
			        <Table.HeaderCell>Due Date</Table.HeaderCell>
			        <Table.HeaderCell>Status</Table.HeaderCell>
			        <Table.HeaderCell>Final Score</Table.HeaderCell>
			      </Table.Row>
			    </Table.Header>	
			    <Table.Body>
			    	{assignments.map((assignment,index) =>{
			    		const {assignment_details, details} = assignment.issued_assignments
			    		const percentage = Math.round(details.final_score/assignment_details.total_points*100)
			    		const score = details.status === "Graded" ? `${details.final_score}/${assignment_details.total_points} (${percentage}%)` : "Ungraded"
			    		const goToAssignmentButton = <Button onClick={goToAssignment} name={assignment_details.id}>do assignment</Button>
				    	return(
					    	<Table.Row key={index}>
						        <Table.Cell>{assignment_details.title}</Table.Cell>
						        <Table.Cell>{assignment_details.subject}</Table.Cell>
						        <Table.Cell>{assignment_details.assignment_type}</Table.Cell>
						        <Table.Cell><Moment format="MM/DD/YYYY (dddd)" date={details.assigned_date}/></Table.Cell>
						        <Table.Cell><Moment format="MM/DD/YYYY (dddd)" date={details.due_date}/></Table.Cell>
						        <Table.Cell>{details.status==="Pending" && isStudent ? goToAssignmentButton : details.status}</Table.Cell>
						        <Table.Cell>{score}</Table.Cell>
					    	</Table.Row>
					)})}
			    </Table.Body>
			</Table>
		)
}

export default AssignmentTable