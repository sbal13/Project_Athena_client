export default function assignmentReducer (state={currentAssignment: {}, 
												  allAssignments: [], 
												  finishedAssignments: [],
												  teacherAssignments:[]}, 
										   action){
	switch(action.type){
		case "LOAD_ASSIGNMENT":
			const currentAssignment = {currentAssignment: action.payload.assignment}
			return Object.assign({}, state, currentAssignment)
		case "CREATE_NEW_ASSIGNMENT": 
			return Object.assign({}, state, {allAssignments: [...state.allAssignments, action.payload.assignment]})
		case "GET_ALL_ASSIGNMENTS":
			return Object.assign({}, state, {allAssignments: action.payload.assignments})
		case "GET_TEACHER_ASSIGNMENTS":
			return Object.assign({}, state, {teacherAssignments: action.payload.assignments})
		case "CLEAR_TEACHER_DATA":
			return Object.assign({}, state, {teacherAssignments: []})
		case "USER_FINISHED_ASSIGNMENTS":
			return  Object.assign({}, state, {finishedAssignments: [...state.finishedAssignments, action.payload.finished_assignments]})

		default:
			return state
	}

	
}