import {Form, Segment, Button, Dropdown} from 'semantic-ui-react'
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

 	const SUBJECTS = [
		"English Literature",
		"Math",
		"Chemistry",
		"Biology",
		"Writing",
		"Grammar",
		"Physics",
		"Foreign Language",
		"History"]

	const items = SUBJECTS.map((subject,index) => ({key: index, value: subject, text: subject}) )

	const placeholders = (type==="teacher") ? 
			["What grades do you teach? What's your favorite book? Do you like pizza?", "What subjects do you specialize in?"] :
			["What grade are you in? What's your favorite subject? How many jumping jacks can you do?", "What subjects are you looking to learn?"]

 	return (
 		<Segment raised>
 			<Form.Group>
				<Form.TextArea
					   className="ui form textarea"
					   name="description"
					   autoheight
					   rows={4} 
					   value={description} 
					   placeholder={`Tell us a little about yourself! ${placeholders[0]} Anything at all!`}
					   onChange={handleDescription}/>
				<Dropdown onChange={chooseSubject} 
						  closeOnChange={true} 
						  placeholder={placeholders[1]} 
						  fluid 
						  multiple 
						  search 
						  selection 
						  options={items}/>
				<Button color={!!description ? "green" : null}fluid onClick={handleSubmit}>sign up</Button>
			</Form.Group>
		</Segment>
 	)
 }

 export default UserDetails