import React from 'react'
import {Grid} from 'semantic-ui-react'
import InActiveQuestion from './ActiveQuestion'
import ViewAndGradeControls from './ViewAndGradeControls'
import {connect} from 'react-redux'
import {getUser} from '../actions/users'
import {finalizeScore} from '../actions/assignments'


class ViewAndGrade extends React.Component{

	state ={
		comments: this.props.assignment.details.teacher_comments,
		pointsPerQuestion: this.props.assignment.details.question_points
	}

	handleChange = (name, value) =>{
		this.setState({[name]: value})
	}

	handlePointChange = (questionNum, points) => {
		let newPoints = this.state.pointsPerQuestion.slice()
		points = parseInt(points,10)
		if (points > this.props.assignment.questions[questionNum].point_value){
			newPoints[questionNum] = this.props.assignment.questions[questionNum].point_value
			this.setState({pointsPerQuestion: newPoints})
		} else {
			newPoints[questionNum] = points
			this.setState({pointsPerQuestion: newPoints})
		}
	}


	componentWillMount(){
		this.props.getStudent(this.props.assignment.details.student_id)
	}

	submitFinal = ()=>{
		this.props.grade(this.state, this.props.assignment.details.id)
		.then(res => this.props.history.push('/dashboard'))
	}

	componentWillReceiveProps(nextProps){

			this.setState({
				comments: nextProps.assignment.details.teacher_comments,
				pointsPerQuestion: nextProps.assignment.details.question_points
			})
	}

	render(){
		console.log(this.state)
		const {assignment_details, questions, details} = this.props.assignment
		const questionComponents = questions.map((question,index) => {
			return <InActiveQuestion key={index} 
					   questionNum={index} 
					   selectedAnswer={details.given_answers[index]} 
					   selectAnswer={null} 
					   questionDetails={question}
					   over={false}
					   readOnly={true}/>
		})

		return(
			<Grid centered columns={2}>
				<Grid.Row>
					<Grid.Column width={10}>
						{questionComponents}
					</Grid.Column>
					<Grid.Column width={4}>
						<ViewAndGradeControls assignmentDetails={assignment_details} 
											  handleChange={this.handleChange}
											  handlePointChange={this.handlePointChange}
											  questions={questions}
											  student={this.props.student}
											  details={details}
											  pointsPerQuestion={this.state.pointsPerQuestion}
											  points={this.props.assignment.details.final_score}
											  comments={this.state.comments}
											  submitFinal={this.submitFinal}
											  isTeacher={this.props.isTeacher}/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
	)}
}

function mapStateToProps (state) {
	return{
		student: state.user.user
	}
}

function mapDispatchToProps (dispatch){
	return {
		getStudent: (studentId) =>{
			dispatch(getUser(studentId))
		},
		grade: (finalParams, issuedAssignmentId) => {
			finalParams.pointsPerQuestion = finalParams.pointsPerQuestion.map(points => points ? points : 0)
			return dispatch(finalizeScore(finalParams, issuedAssignmentId))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewAndGrade)