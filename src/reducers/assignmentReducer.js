export default function assignmentReducer (state={currentAssignment: {}, allAssignments: []}, action){
	switch(action.type){
		case "LOAD_ASSIGNMENT":
			return {currentAssignment: action.payload.assignment}
		case "CREATE_NEW_ASSIGNMENT":
			debugger
			return {allAssignments: [...state.allAssignments, action.payload.assignment]}
		case "GET_ALL_ASSIGNMENTS":
			return {allAssignments: action.payload.allAssignments}
		default:
			return state
	}

	
}