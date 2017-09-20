export default function authReducer (state={user:{}, type:""}, action){
	switch(action.type){
		case "LOG_IN":
			localStorage.setItem('jwt', action.payload.jwt)
			return action.payload.user
		case "LOG_OUT":
		    localStorage.removeItem('jwt')
			return {user:{}, type:""} 
		default:
			return state
	}
	
}