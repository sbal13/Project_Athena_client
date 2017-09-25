export default function authReducer (state={user:{},loggedIn:false}, action){
	switch(action.type){
		case "LOG_IN":
			localStorage.setItem('jwt', action.payload.jwt)
			return {user: action.payload.user, loggedIn: true}
		case "LOG_OUT":
		    localStorage.removeItem('jwt')
			return {user:{}, loggedIn:false} 
		case "GET_USER":
			return {user: action.payload.user, loggedIn:true}
		default:
			return state
	}
	
}