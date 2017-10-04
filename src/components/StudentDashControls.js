import React from 'react'
import {Dropdown, Grid} from 'semantic-ui-react'
import {SUBJECTS, STATUS_TYPES} from '../helpers/constants'
import Toggle from 'react-toggle'


const StudentDashControls = ({teachers, chooseFilter, toggle, filterByTeacher, filterBySubject,filterByStatus}) => {

	const teacherOptions = teachers.map((teacher,index) => ({key: index, value: teacher.id, text: teacher.username}))

	const handleToggle = (event)=>{
		toggle(event.target.name)
	}

	return(
		<Grid columns={2}>
			<Grid.Row>
				<Grid.Column verticalAlign="middle" width={3}> 
					<Toggle checked={filterByTeacher}
							icons={false}
							name='filterByTeacher'
							onChange={handleToggle}/>
				</Grid.Column>
				<Grid.Column width={13}>
					<Dropdown onChange={chooseFilter} 
							  name="teacherFilter"
							  closeOnChange={true} 
							  fluid 
							  search 
							  selection
							  disabled={!filterByTeacher}
							  placeholder="Filter by teacher" 
							  options={teacherOptions}/>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column verticalAlign="middle" width={3}> 
					<Toggle checked={filterBySubject}
							icons={false}
							name='filterBySubject'
							onChange={handleToggle}/>
				</Grid.Column>
				<Grid.Column width={13}>
					<Dropdown onChange={chooseFilter} 
							  name="subjectFilter"
							  closeOnChange={true} 
							  fluid 
							  search 
							  selection
							  disabled={!filterBySubject} 
							  placeholder="Filter by subject" 
							  options={SUBJECTS}/>								
				</Grid.Column>
			</Grid.Row>	
			<Grid.Row>
				<Grid.Column verticalAlign="middle" width={3}> 
					<Toggle checked={filterByStatus}
							icons={false}
							name='filterByStatus'
							onChange={handleToggle}/>
				</Grid.Column>
				<Grid.Column width={13}>
					<Dropdown onChange={chooseFilter} 
					      	  name="statusFilter"
							  closeOnChange={true} 
							  fluid 
							  search 
							  selection
							  disabled={!filterByStatus}
							  placeholder="Filter by status" 
							  options={STATUS_TYPES}/>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	)
}

export default StudentDashControls