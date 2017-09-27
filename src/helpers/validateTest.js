

export function validateTest(state){
	// return !!state.difficulty &&
	// 	   !!state.subject &&
	// 	   !!state.description &&
	// 	   !!state.assignmentType &&
	// 	   !!state.grade &&
	// 	   (state.time > 0 || !state.timed) &&
	// 	   state.questions.length > 0 &&
	// 	   !state.questions.find(question => !validateQuestion(question))

	const {difficulty, description, subject, assignmentType, grade, timed, questions, time} = state

	let messages = []

	if (!difficulty) {
		messages.push("Please enter a difficulty!")
	}
	if (!description) {
		messages.push("Please enter a description!")
	}
	if (!subject) {
		messages.push("Please enter a subject!")
	}
	if (!assignmentType) {
		messages.push("Please enter an assignment type!")
	}
	if (!grade) {
		messages.push("Please enter a grade level!")
	}

	if (timed){
		if (time <= 0){
			messages.push("If this assignment is timed, it must have a time greater than 0!")
		}
	}

	if (questions.length > 0) {
		questions.forEach((question, index) => {
			messages = messages.concat(validateQuestion(question, index+1))
		})
	} else {
		messages.push("This assignment has no questions!")
	}


	return messages

}

function validateQuestion(question, questionNum){
	const  {answer, points, choices} = question
	const messages = []
	
	// return !!question.question &&
	// 	   !!question.answer &&
	// 	   question.points > 0 &&
	// 	   question.choices.length > 0 &&
	// 	   (question.choices.filter(choice => !choice).length === 0)

	if (!question.question){
		messages.push(`#${questionNum} has no question!`)
	}

	if (!answer){
	 	messages.push(`#${questionNum} has no answer!`)
	}

	if (points <= 0){
	 	messages.push(`#${questionNum} must have a point value greater than 0!`)
	}

	if (choices.length === 0){
		messages.push(`#${questionNum} has no choices!`)
	} else {
		if (question.choices.filter(choice => !choice).length !== 0){
			messages.push(`#${questionNum} has a blank choice!`)
		}
	}

	return messages

}


