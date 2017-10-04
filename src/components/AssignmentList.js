import React from 'react'
import {Accordion} from 'semantic-ui-react';
import AssignmentItem from './AssignmentItem'
import moment from 'moment'



const AssignmentList = ({assignments, history})=>{

	
	const visitAssignment = (id) => {
		history.push(`/assignment/${id}`)
	}

	const assignmentComponents = assignments.map((assignment, index) => {
		return {
			key: `${index}`,
			title: assignment.details.historical ? assignment.details.title + ` (HISTORICAL ${moment(assignment.details.created_at).format("MM/DD/YYYY")})`: assignment.details.title,
			content: <AssignmentItem details={assignment.details} creator={assignment.creator} visitAssignment={visitAssignment} />
		}
	})

	return(
		<Accordion fluid styled panels={assignmentComponents}/>
	)
}

export default AssignmentList