import React from 'react'
import {Card, Form, Segment, Accordion, Label, Input, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


const ViewAndGradeControls = ({handleChange, handlePointChange, comments, assignmentDetails, student, points, questions, details, pointsPerQuestion, submitFinal, isTeacher})=>{

	let isGraded = (details.status === "Graded")
	let isPending = (details.status === "Pending")

	const handleInput = (event) => {
		if (isTeacher){
			handleChange(event.target.name, event.target.value)
		}
	}

	const handlePointInput = (event) => {
		const questionNum = event.target.name.split("-")[1]
		handlePointChange(questionNum, event.target.value)
	}


	const questionComponent = questions.map((question, index) => {

		let color 

		if (question.question_type === "multiple choice"){
			if (question.answer === details.given_answers[index]) {
				color = "green"
			} else {
				color = "red"
			}
		} else {
			color === null
		}

		

		const answer = <div><p>Correct Answer: {question.answer}</p><p>Student's Answer: {details.given_answers[index]}</p></div>
		const pointInput = !isTeacher ? `${pointsPerQuestion[index] || "0"}/${question.point_value}` : <Input fluid labelPosition='right' 
							       type='number'>
							    	<input
							    	   onChange={handlePointInput}
									   name={`points-${index}`} 
									   value={pointsPerQuestion[index]}/>
									<Label>{`/${question.point_value}`}</Label>
							</Input>

		return {
			key: `${index}`,
			title: <Label color={color} content={`Question #${index+1} (${pointsPerQuestion[index] || "0"}/${question.point_value})`}/>,
			content: <Card fluid>
						<Card.Content>
							{question.question_type === "multiple choice" ? answer : pointInput}
						</Card.Content>
					</Card>
		}
	})



	return (

		<Card fluid>
			<Card.Content>

				<Segment>
					<p>Student name: {student.first_name + " " + student.last_name}</p>
					<p>Username: {student.username}</p>
					<p>Assignment: {assignmentDetails.title}</p>
					<strong>Score: {`${points}/${assignmentDetails.total_points} (${Math.round(points/assignmentDetails.total_points*100)}%)`} {details.status ==="Submitted" ? "(Grading required)" : null}</strong>
				</Segment>

				<Segment>
					<Accordion fluid styled panels={questionComponent}/>
				</Segment>

				<Form>
					<Form.TextArea name="comments" value={comments||""} rows={5} onChange={handleInput} placeholder="Comment on this assignment"/>
				</Form>
			</Card.Content>
			{isTeacher ? <Button color="teal" fluid onClick={submitFinal} disabled={isPending}>{isGraded ? "Update" : "Finalize Grade"}</Button> : null}
			{isGraded ? <Link to='/dashboard'><Button fluid color="orange">Back to Dashboard</Button></Link> : null}
		</Card>

	)
}


export default ViewAndGradeControls