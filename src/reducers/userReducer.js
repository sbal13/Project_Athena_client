export default function userReducer (state={userTeachers:[], 
											userStudents:[],
											relations: [],
											allTeachers:[],
											allStudents:[],
											user: {}
											}, action){
	switch(action.type){

		case "GET_USER_TEACHERS":
			return Object.assign({}, state, {userTeachers: action.payload.teachers})
		case "GET_USER_STUDENTS":
			return Object.assign({}, state, {userStudents: action.payload.students})
		case "GET_ALL_TEACHERS":
			return Object.assign({}, state, {allTeachers: action.payload.teachers})
		case "GET_ALL_STUDENTS":
			return Object.assign({}, state, {allStudents: action.payload.students})
		case "ADD_TEACHER":
			return Object.assign({}, state, {userTeachers: [...state.userTeachers, action.payload.teacher]})
		case "GET_USER":
			return Object.assign({}, state, {user: action.payload.user, relations: action.payload.relations})
		default:
			return state
	}
	
}