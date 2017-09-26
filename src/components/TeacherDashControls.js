import React from 'react'
import {Dropdown, Card, Button, Label} from 'semantic-ui-react'
import moment from 'moment';
import DatePicker from 'react-datepicker'

const TeacherDashControls = ({students, openDetails, assignments, chooseAssignment, chooseStudent, assign, date, handleDateChange})=>{

	const studentOptions = students.map((student,index) => ({key: index, value: student.id, text: student.username}))

	const assignmentOptions = assignments.map((assignment, index)=> ({key: index, value: assignment.details.id, text: assignment.details.title}))

	return(
		<Card.Content>
			<Dropdown onChange={chooseStudent} 
					  closeOnChange={true} 
					  fluid 
					  search 
					  placeholder="select student"
					  selection 
					  options={studentOptions}/>
			<Dropdown onChange={chooseAssignment} 
					  closeOnChange={true} 
					  fluid 
					  search
					  placeholder="select assignment" 
					  selection 
					  options={assignmentOptions}/>
			<Label size="large">Due Date</Label>
			<div className="ui input">
				<DatePicker selected={date} minDate={moment()}onChange={handleDateChange}/>
			</div>
			<Button fluid color="teal" onClick={assign}>assign</Button>
		</Card.Content>
	)
}

export default TeacherDashControls

