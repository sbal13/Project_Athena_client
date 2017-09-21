export default function authReducer (state={user:{}}, action){
	switch(action.type){
		case "LOG_IN":
			localStorage.setItem('jwt', action.payload.jwt)
			return {user: action.payload.user}
		case "LOG_OUT":
		    localStorage.removeItem('jwt')
			return {user:{}} 
		case "GET_USER":
			return {user: action.payload.user}
		default:
			return state
	}
	
}