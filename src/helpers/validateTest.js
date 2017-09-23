

export function validateTest(state){
	return !!state.difficulty &&
		   !!state.subject &&
		   !!state.description &&
		   !!state.assignmentType &&
		   !!state.grade &&
		   (state.time > 0 || !state.timed) &&
		   state.questions.length > 0 &&
		   !state.questions.find(question => !validateQuestion(question))
}

function validateQuestion(question){
	return !!question.question &&
		   !!question.answer &&
		   question.points > 0 &&
		   question.choices.length > 0 &&
		   (question.choices.filter(choice => !choice).length === 0)

}


