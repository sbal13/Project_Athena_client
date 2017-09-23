import {Form, Segment, Button, Dropdown} from 'semantic-ui-react'
import {PLACEHOLDERS, SUBJECTS} from '../helpers/constants'
import React from 'react'
import {validateFinalSignup} from '../helpers/validateSignup'




 const UserDetails = ({handleFinalSubmit, handleChange, teacherKey, description, type, subjects, chooseSubject}) => {

 	const handleText = (event) => {
 		handleChange(event)
 	}

 	const handleSubmit = () => {
 		if (!!description) {
 			handleFinalSubmit()
 		}
 	}

 	return (
 		<Segment raised>
 			<Form.Group>
				<Form.TextArea
					   className="ui form textarea"
					   name="description"
					   rows={4} 
					   value={description} 
					   placeholder={`Tell us a little about yourself! ${PLACEHOLDERS[type][0]} Anything at all!`}
					   onChange={handleText}/>
				{type === "teacher" ? <Form.Input type="text"
							name="teacherKey"
							value={teacherKey}
							fluid
							placeholder="Enter a teacher passcode. Students will use this to add you as a teacher."
							onChange={handleText}/>
							: null}
				<Dropdown onChange={chooseSubject} 
						  closeOnChange={true} 
						  placeholder={PLACEHOLDERS[type][1]} 
						  fluid 
						  multiple 
						  search 
						  selection 
						  options={SUBJECTS}/>
				<Button color="teal" disabled={!validateFinalSignup(description, subjects, type, teacherKey)}fluid onClick={handleSubmit}>sign up</Button>
			</Form.Group>
		</Segment>
 	)
 }

 export default UserDetails