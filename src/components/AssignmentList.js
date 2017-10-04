import React from 'react'
import {Accordion} from 'semantic-ui-react';
import AssignmentItem from './AssignmentItem'
import moment from 'moment'



const AssignmentList = ({assignments, history})=>{

	
	const visitAssignment = (id) => {
		history.push(`/assignment/${id}`)
	}

	const assignmentComponents = assignments.map((assignment, index) => {


		return (
			[<Accordion.Title key={`title-${index}`} style={index%2===0 ? {backgroundColor: "rgba(200,200,200,0.2)"} : {backgroundColor: "white"}}>
				{assignment.details.historical ? assignment.details.title + ` (HISTORICAL ${moment(assignment.details.created_at).format("MM/DD/YYYY")})`: assignment.details.title}
			</Accordion.Title>,
			<Accordion.Content key={`content-${index}`} style={index%2===0 ? {backgroundColor: "rgba(200,200,200,0.2)"} : {backgroundColor: "white"}}>
				<AssignmentItem details={assignment.details} creator={assignment.creator} visitAssignment={visitAssignment} />
			</Accordion.Content>]
		)
	})

	return(
		<Accordion fluid styled>
			{assignmentComponents}
		</Accordion>
	)
}

export default AssignmentList