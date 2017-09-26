export function initialDetailsFilled (state){
		// return !!(state.username && 
		// 		  state.email && 
		// 		  state.password && 
		// 		  state.passwordConfirmation && 
		// 		  state.firstName &&
		// 		  state.lastName)

		const messages = []

		let params = ["Username", "Email", "Password", "Password Confirmation", "First Name", "Last Name"]
		params.forEach(param => {
			let sanitizedParam = ""
			if (param.split(" ").length===2){
				let splitWord = param.split(" ")
				sanitizedParam = splitWord[0].toLowerCase().concat(splitWord[1])
			} else {
				sanitizedParam = param.toLowerCase()
			}
			if (!state[sanitizedParam]){
				messages.push(`${param} cannot by left blank!`)
			}
		})

		let final = {valid: messages.length===0, messages: messages}
		return final
	}

export function passwordsMatch(pw, pwc){
	let messages = []
	if (pw !== pwc) {
		messages.push("Passwords do not match!")
	}
	return {valid: pw === pwc, messages: messages}
}

export function validateInitialSignup(state){

	const filled=initialDetailsFilled(state)
	const match=passwordsMatch(state.password, state.passwordConfirmation)

	const final = {
		valid: filled.valid && match.valid, 
	 	messages: filled.messages.concat(match.messages)
	}

	return final
}



export function validateFinalSignup(description, subjects, type, teacherKey){
	const messages = []
	if (!description){
		messages.push("Please tell us about yourself")
	}
	if (subjects.length == 0){
		messages.push("Please let us know what subjects you teach")
	}

	if (type === "teacher" && !teacherKey){
		messages.push("Please give us a unique teacher key. Students will use this to add you as their teacher.")
	}

	return messages

}