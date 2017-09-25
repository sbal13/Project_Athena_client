import React from 'react'
import {Table} from 'semantic-ui-react'


const AssignmentTable = ({assignments}) =>{

	return(
			 <Table celled padded>
			    <Table.Header>
			      <Table.Row>
			        <Table.HeaderCell>Title</Table.HeaderCell>
			        <Table.HeaderCell>Subjects</Table.HeaderCell>
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

				    	return(
					    	<Table.Row key={index}>
						        <Table.Cell>{assignment_details.title}</Table.Cell>
						        <Table.Cell>{assignment_details.subject}</Table.Cell>
						        <Table.Cell>{assignment_details.assignment_type}</Table.Cell>
						        <Table.Cell>{details.assigned_date}</Table.Cell>
						        <Table.Cell>{details.due_date}</Table.Cell>
						        <Table.Cell>{details.status}</Table.Cell>
						        <Table.Cell>{details.final_score}/{assignment_details.total_points} ({percentage}%)</Table.Cell>
					    	</Table.Row>
					)})}
			    </Table.Body>
			</Table>
		)
}

export default AssignmentTable