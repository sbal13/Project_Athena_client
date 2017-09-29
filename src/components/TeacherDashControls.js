import React from 'react'
import {Dropdown, Card, Button, Label, Grid, Segment} from 'semantic-ui-react'
import moment from 'moment';
import DatePicker from 'react-datepicker'
import {SUBJECTS, STATUS_TYPES} from '../helpers/constants'


const TeacherDashControls = ({students, assignments, chooseAssignment, chooseStudent, assign, date, handleDateChange, chooseFilter, toggle, filterByStudent, filterBySubject,filterByStatus, filterByAssignment})=>{

	const studentOptions = students.map((student,index) => ({key: index, value: student.id, text: student.username}))

	const assignmentOptions = assignments.map((assignment, index)=> ({key: index, value: assignment.details.id, text: assignment.details.title}))
	
	const handleToggle = (event)=>{
		toggle(event.target.name)
	}
	return(
		<Card.Content>
			<Segment>
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column width={6}> 
							<Button fluid toggle active={filterByStudent} name="filterByStudent" onClick={handleToggle}>Student</Button>
						</Grid.Column>
						<Grid.Column width={10}>
							<Dropdown onChange={chooseFilter} 
									  name="studentFilter"
									  closeOnChange={true} 
									  fluid 
									  search 
									  selection 
									  options={studentOptions}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={6}> 
							<Button fluid toggle active={filterByAssignment} name="filterByAssignment" onClick={handleToggle}>Assignment</Button>
						</Grid.Column>
						<Grid.Column width={10}>
							<Dropdown onChange={chooseFilter} 
							      	  name="assignmentFilter"
									  closeOnChange={true} 
									  fluid 
									  search 
									  selection 
									  options={assignmentOptions}/>
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
			</Segment>

			<Segment>
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
					<DatePicker selected={date} minDate={moment()}onChange={handleDateChange}/>
				</div>
				<Button fluid color="teal" onClick={assign}>assign</Button>
			</Segment>
		</Card.Content>
	)
}

export default TeacherDashControls

