export default function authReducer (state={user:{}}, action){
	switch(action.type){
		case "LOG_IN":
			localStorage.setItem('jwt', action.payload.jwt)
			action.payload.user.subjects = action.payload.user.subjects.split("~*~")
			return {user: action.payload.user}
		case "LOG_OUT":
		    localStorage.removeItem('jwt')
			return {user:{}} 
		case "GET_USER":
			action.payload.user.subjects = action.payload.user.subjects.split("~*~")
			return {user: action.payload.user}
		default:
			return state
	}
	
}