import React from 'react'
import {Dropdown, Card, Button} from 'semantic-ui-react'

const TeacherDashControls = ({students, openDetails, assignments, chooseAssignment, assign})=>{

	const studentOptions = students.map((student,index) => ({key: index, value: student.id, text: student.username}))

	const assignmentOptions = assignments.map((assignment, index)=> ({key: index, value: assignment.details.id, text: assignment.details.title}))

	return(
		<Card.Content>
			<Dropdown onChange={openDetails} 
					  closeOnChange={true} 
					  fluid 
					  search 
					  selection 
					  options={studentOptions}/>
			<Dropdown onChange={chooseAssignment} 
					  closeOnChange={true} 
					  fluid 
					  search 
					  selection 
					  options={assignmentOptions}/>
			<Button fluid color="teal" onClick={assign}>assign</Button>
		</Card.Content>
	)
}

export default TeacherDashControls

