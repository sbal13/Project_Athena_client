
const defaultState = {currentAssignment: {},
					  currentSubmittedAssignment:{},
					  allAssignments: [], 
					  studentAssignments: [], 
					  allStudentAssignments: [],
					  finishedAssignments: [],
					  teacherAssignments:[]}

function assignmentReducer (state = defaultState, action){
	switch(action.type){
		case "LOAD_ASSIGNMENT":
			const currentAssignment = {currentAssignment: action.payload.assignment}
			return Object.assign({}, state, currentAssignment)
		case "CREATE_NEW_ASSIGNMENT": 
			return Object.assign({}, state, {allAssignments: [...state.allAssignments, action.payload.assignment],
											 teacherAssignments: [...state.teacherAssignments, action.payload.assignment]})
		case "EDIT_ASSIGNMENT": 
			const allIndex = state.allAssignments.findIndex(assignment => assignment.details.id === action.payload.edited_assignment.details.id)
			const teacherIndex = state.teacherAssignments.findIndex(assignment => assignment.details.id === action.payload.edited_assignment.details.id)

			const allCopy = state.allAssignments.slice()
			allCopy[allIndex] = action.payload.edited_assignment

			const teacherCopy = state.teacherAssignments.slice()
			teacherCopy[teacherIndex] = action.payload.edited_assignment


			return Object.assign({}, state, {allAssignments: [...allCopy, action.payload.historical_assignment],
											 teacherAssignments: [...teacherCopy, action.payload.historical_assignment]})
		
		case "DELETE_ASSIGNED_ASSIGNMENT": 
			console.log(state.allStudentAssignments)
			let newAllStudentAssignments = state.allStudentAssignments.filter(assignment => assignment.issued_assignments.details.id !== action.payload.id)
			console.log(newAllStudentAssignments)
			return Object.assign({}, state, {allStudentAssignments: newAllStudentAssignments})
		case "DELETE_ASSIGNMENT": 
			let newAllStudent = state.allStudentAssignments.filter(assignment => assignment.issued_assignments.assignment_details.id !== action.payload.id)
			let newAll = state.allAssignments.filter(assignment => assignment.details.id !== action.payload.id)
			let newAllTeacher = state.teacherAssignments.filter(assignment => assignment.details.id !== action.payload.id)
			return Object.assign({}, state, {allAssignments: newAll,
											 teacherAssignments: newAllTeacher,
											 allStudentAssignments: newAllStudent})
		case "COPY_ASSIGNMENT": 
			return Object.assign({}, state, {allAssignments: [...state.allAssignments, action.payload.assignment],
											 teacherAssignments: [...state.teacherAssignments, action.payload.assignment]})
		case "ASSIGN_ASSIGNMENT":
			return Object.assign({}, state, {studentAssignments: [...state.allStudentAssignments, ...action.payload.assignments]})
		case "GET_SUBMITTED_ASSIGNMENT":
			return Object.assign({}, state, {currentSubmittedAssignment: action.payload.issued_assignment})
		case "GET_ALL_ASSIGNMENTS":
			return Object.assign({}, state, {allAssignments: action.payload.assignments})
		case "GET_TEACHER_ASSIGNMENTS":
			return Object.assign({}, state, {teacherAssignments: action.payload.assignments})
		case "GET_STUDENT_ASSIGNMENTS":
			return Object.assign({}, state, {studentAssignments: action.payload.assignments})
		case "GET_ALL_STUDENT_ASSIGNMENTS":
			return Object.assign({}, state, {allStudentAssignments: action.payload.assignments})
		case "CLEAR_TEACHER_DATA":
			return Object.assign({}, state, {teacherAssignments: []})
		case "FINALIZE_SCORE":
			return Object.assign({}, state, {studentAssignments: [...state.studentAssignments, action.payload.assignment]})
		case "USER_FINISHED_ASSIGNMENTS":
			return  Object.assign({}, state, {finishedAssignments: [...state.finishedAssignments, action.payload.finished_assignments]})

		default:
			return state
	}

	
}

export default assignmentReducer
