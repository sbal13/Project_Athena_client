export function initialDetailsFilled (state){
		return !!(state.username && 
				  state.email && 
				  state.password && 
				  state.passwordConfirmation && 
				  state.firstName &&
				  state.lastName)
	}

export function passwordsMatch(pw, pwc){
	return pw === pwc
}

export function validateInitialSignup(state){
	return initialDetailsFilled(state) && passwordsMatch(state.password, state.passwordConfirmation)
}

export function validateFinalSignup(description, subjects, type, teacherKey){
	return !!description && 
		   subjects.length > 0 &&
		   (type === "teacher" ? !!teacherKey : true)

}