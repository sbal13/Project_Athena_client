import React from 'react'
import {Accordion} from 'semantic-ui-react';
import AssignmentItem from './AssignmentItem'



const AssignmentList = ({assignments, history})=>{

	
	const visitAssignment = (id) => {
		history.push(`/assignment/${id}`)
	}

	const assignmentComponents = assignments.map((assignment, index) => {
		return {
			key: `${index}`,
			title: assignment.details.title,
			content: <AssignmentItem details={assignment.details} visitAssignment={visitAssignment} />
		}
	})
	return(
		<Accordion fluid styled panels={assignmentComponents}/>
	)
}

export default AssignmentList