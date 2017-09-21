import {Form, Segment, Button, Dropdown} from 'semantic-ui-react'
import {PLACEHOLDERS, SUBJECTS} from '../constants'
import React from 'react'



 const UserDetails = ({handleFinalSubmit, handleChange, description, type, chooseSubject}) => {

 	const handleDescription = (event) => {
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
					   onChange={handleDescription}/>
				<Dropdown onChange={chooseSubject} 
						  closeOnChange={true} 
						  placeholder={PLACEHOLDERS[type[1]]} 
						  fluid 
						  multiple 
						  search 
						  selection 
						  options={SUBJECTS}/>
				<Button color={!!description ? "green" : null}fluid onClick={handleSubmit}>sign up</Button>
			</Form.Group>
		</Segment>
 	)
 }

 export default UserDetails