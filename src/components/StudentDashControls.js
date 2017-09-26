import React from 'react'
import {Dropdown} from 'semantic-ui-react'


const StudentDashControls = ({teachers, openDetails}) => {

	const teacherOptions = teachers.map((teacher,index) => ({key: index, value: teacher.id, text: teacher.username}))

	
	return(
		<Dropdown onChange={openDetails} 
					  closeOnChange={true} 
					  fluid 
					  search 
					  selection 
					  options={teacherOptions}/>
	)
}

export default StudentDashControls