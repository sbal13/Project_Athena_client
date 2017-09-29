export default function authReducer (state={currentUser: {},loggedIn:false}, action){
	switch(action.type){
		case "LOG_IN":
			localStorage.setItem('jwt', action.payload.jwt)
			return {currentUser: action.payload.user, loggedIn: true}
		case "LOG_OUT":
		    localStorage.removeItem('jwt')
			return {currentUser:{}, loggedIn:false} 
		case "GET_CURRENT_USER":
			return {currentUser: action.payload.user, loggedIn:true}
		default:
			return state
	}
	
}