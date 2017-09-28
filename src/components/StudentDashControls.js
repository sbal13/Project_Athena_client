import React from 'react'
import {Dropdown, Button, Grid} from 'semantic-ui-react'
import {SUBJECTS, STATUS_TYPES} from '../helpers/constants'


const StudentDashControls = ({teachers, chooseFilter, toggle, filterByTeacher, filterBySubject,filterByStatus}) => {

	const teacherOptions = teachers.map((teacher,index) => ({key: index, value: teacher.id, text: teacher.username}))

	const handleToggle = (event)=>{
		toggle(event.target.name)
	}

	return(
		<Grid columns={2}>
			<Grid.Row>
				<Grid.Column width={6}> 
					<Button fluid toggle active={filterByTeacher} name="filterByTeacher" onClick={handleToggle}>Teacher</Button>
				</Grid.Column>
				<Grid.Column width={10}>
					<Dropdown onChange={chooseFilter} 
							  name="teacherFilter"
							  closeOnChange={true} 
							  fluid 
							  search 
							  selection 
							  options={teacherOptions}/>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column width={6}> 
					<Button fluid toggle active={filterBySubject} name="filterBySubject" onClick={handleToggle}>Subject</Button>
				</Grid.Column>
				<Grid.Column width={10}>
					<Dropdown onChange={chooseFilter} 
							  name="subjectFilter"
							  closeOnChange={true} 
							  fluid 
							  search 
							  selection 
							  options={SUBJECTS}/>								
				</Grid.Column>
			</Grid.Row>	
			<Grid.Row>
				<Grid.Column width={6}> 
					<Button fluid toggle active={filterByStatus} name="filterByStatus" onClick={handleToggle}>Status</Button>
				</Grid.Column>
				<Grid.Column width={10}>
					<Dropdown onChange={chooseFilter} 
					      	  name="statusFilter"
							  closeOnChange={true} 
							  fluid 
							  search 
							  selection 
							  options={STATUS_TYPES}/>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default StudentDashControls