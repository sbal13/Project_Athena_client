import React from  'react'
import {Card, Select, Grid, Input} from 'semantic-ui-react'
import Toggle from 'react-toggle'
import {SUBJECTS, GRADES} from '../helpers/constants'

const IndexControl = ({toggle, chooseFilter, filterBySubject, filterByGrade, creatorFilter, assignmentFilter}) => {

	const handleToggle = (event, data)=>{
		toggle(event.target.name)
	}

	return (
		<Card fluid>
			<Card.Header textAlign="center"><h4>Filter and Sort</h4></Card.Header>
			<Card.Content>
				<Grid columns={2}>
					<Grid.Row>
						<Grid.Column width={16}>
							    	<Input fluid
									   onChange={chooseFilter}
								       name="creatorFilter"
								       value={creatorFilter}
								       placeholder="Search by creator"/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={16}>
							    	<Input fluid
									   onChange={chooseFilter}
								       name="assignmentFilter"
								       value={assignmentFilter}
								       placeholder="Search by assignment title"/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={13}>
								<Select onChange={chooseFilter} 
									  name="subjectFilter"
									  fluid 
									  disabled={!filterBySubject}
									  placeholder ="Filter by subject" 
									  options={SUBJECTS}/>
						</Grid.Column>
						<Grid.Column verticalAlign="middle" width={3}> 
							<Toggle checked={filterBySubject}
									icons={false}
									name='filterBySubject'
									onChange={handleToggle}/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column width={13}>
								<Select onChange={chooseFilter} 
								      	  name="gradeFilter"
								      	  fluid
										  disabled={!filterByGrade}
										  placeholder ="Filter by grade" 
										  options={GRADES}/>
						</Grid.Column>
						<Grid.Column verticalAlign="middle" width={3}> 
							<Toggle checked={filterByGrade}
									icons={false}	
									name='filterByGrade'
									onChange={handleToggle}/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Card.Content>
		</Card>
)}

export default IndexControl