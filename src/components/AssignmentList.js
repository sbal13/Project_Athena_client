import React from 'react'
import {Accordion, Label} from 'semantic-ui-react';
import AssignmentItem from './AssignmentItem'



const AssignmentList = ({assignments, history})=>{

	
	const visitAssignment = (id) => {
		history.push(`/assignment/${id}`)
	}

	const assignmentComponents = assignments.map((assignment, index) => {
		return {
			key: `${index}`,
			title: <Label>{assignment.details.title}</Label>,
			content: <AssignmentItem details={assignment.details} visitAssignment={visitAssignment} />
		}
	})
	return(
		<Accordion panels={assignmentComponents}/>
	)
}

export default AssignmentList