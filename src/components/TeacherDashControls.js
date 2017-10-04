import React from 'react'
import {Dropdown, Card, Button, Label, Grid, Segment, Icon} from 'semantic-ui-react'
import moment from 'moment';
import DatePicker from 'react-datepicker'
import {SUBJECTS, STATUS_TYPES} from '../helpers/constants'
import Toggle from 'react-toggle'


const TeacherDashControls = ({students, assignments, chooseAssignment, chooseStudent, assign, date, handleDateChange, chooseFilter, toggle, filterByStudent, filterBySubject,filterByStatus, filterByAssignment})=>{

	const studentOptions = students.map((student,index) => ({key: index, value: student.id, text: student.username}))

	const assignmentOptions = assignments.map((assignment, index)=> ({key: index, value: assignment.details.id, text: (assignment.details.historical ? assignment.details.title + ` (ARCHIVED ${moment(assignment.details.created_at).format("MM/DD/YYYY")})` : assignment.details.title)}))
	
	const handleToggle = (event, data)=>{
		toggle(event.target.name)
	}
	return(
		<Card.Content>
			<Card fluid>
				<Card.Header textAlign="center"><h4>Filter Assignments</h4></Card.Header>
				<Card.Content>
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column verticalAlign="middle" width={3}> 
							<Toggle checked={filterByStudent}
									icons={false}
									name='filterByStudent'
									onChange={handleToggle}/>
						</Grid.Column>
						<Grid.Column width={13}>
							<Dropdown onChange={chooseFilter} 
									  name="studentFilter"
									  closeOnChange={true} 
									  fluid 
									  search 
									  selection
									  disabled={!filterByStudent}
									  placeholder ="Filter by student" 
									  options={studentOptions}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column verticalAlign="middle" width={3}> 
							<Toggle checked={filterByAssignment}
									icons={false}	
									name='filterByAssignment'
									onChange={handleToggle}/>
						</Grid.Column>
						<Grid.Column width={13}>
							<Dropdown onChange={chooseFilter} 
							      	  name="assignmentFilter"
									  closeOnChange={true} 
									  fluid 
									  search 
									  selection 
									  disabled={!filterByAssignment}
									  placeholder ="Filter by assignment" 
									  options={assignmentOptions}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column verticalAlign="middle" width={3}> 
							<Toggle checked={filterBySubject}
									name='filterBySubject'
									icons={false}
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
									  placeholder ="Filter by subject"  
									  options={SUBJECTS}/>								
						</Grid.Column>
					</Grid.Row>	
					<Grid.Row>
						<Grid.Column verticalAlign="middle" width={3}> 
							<Toggle checked={filterByStatus}
									name='filterByStatus'
									icons={false}
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
									  placeholder ="Filter by status" 
									  options={STATUS_TYPES}/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
				</Card.Content>
			</Card>

			<Card fluid>
				<Card.Header textAlign="center"><h4>Assign</h4></Card.Header>
				<Card.Content>
				<Dropdown onChange={chooseStudent} 
						  closeOnChange={true} 
						  fluid 
						  search 
						  multiple
						  placeholder="select student"
						  selection 
						  options={studentOptions}/>
				<Dropdown onChange={chooseAssignment} 
						  closeOnChange={true} 
						  fluid 
						  search
						  multiple
						  placeholder="select assignment" 
						  selection 
						  options={assignmentOptions}/>
				<Label size="large">Due Date</Label>
				<div className="ui input">
					<DatePicker selected={date} minDate={moment()} onChange={handleDateChange}/>
				</div>
				<Button fluid color="teal" onClick={assign}>assign</Button>
				</Card.Content>
			</Card>
		</Card.Content>
	)
}

export default TeacherDashControls

