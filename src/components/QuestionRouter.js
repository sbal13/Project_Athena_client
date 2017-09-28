import React from 'react'
import MCQuestionForm from './MCQuestionForm'
import OEQuestionForm from './OEQuestionForm'

const QuestionRouter = ({question, handleQuestionChange, addChoice, questionNumber, changeAnswer, deleteQuestion, deleteChoice}) => {
	let questionComponent = null 

	switch (question.questionType){
		case 'multiple choice':
			questionComponent = <MCQuestionForm 
								  question={question.question}
								  answer={question.answer}
								  choices={question.choices}
								  points={question.points}
								  handleChange={handleQuestionChange}
								  addChoice={addChoice}
								  questionNumber={questionNumber} 
								  changeAnswer={changeAnswer}
								  deleteQuestion={deleteQuestion}
								  deleteChoice={deleteChoice}
								  />
			break;
		case 'open ended':
			questionComponent = <OEQuestionForm 
								  question={question.question}
								  points={question.points}
								  handleChange={handleQuestionChange}
								  questionNumber={questionNumber} 
								  deleteQuestion={deleteQuestion}
								  />
			break;
		case 'essay':
			questionComponent = <OEQuestionForm 
								  question={question.question}
								  points={question.points}
								  handleChange={handleQuestionChange}
								  questionNumber={questionNumber} 
								  deleteQuestion={deleteQuestion}
								  />
			break;
		default:
			questionComponent = null
			break;
	}

	return questionComponent
	
}

export default QuestionRouter