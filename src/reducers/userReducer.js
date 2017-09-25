export default function userReducer (state={userTeachers:[], 
											userstudents:[],
											allTeachers:[],
											allStudents:[],
											user: {}
											}, action){
	switch(action.type){

		case "GET_USER_TEACHERS":
			return state
		case "GET_USER_STUDENTS":
			return state
		case "GET_ALL_TEACHERS":
			return state
		case "GET_ALL_STUDENTS":
			return state
		case "ADD_TEACHER":
			return state
		case "GET_USER":

			return Object.assign({}, state, {user: action.payload.user})
		default:
			return state
	}
	
}