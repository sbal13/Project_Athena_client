export function newAssignment(assignment, history) {
    
    return function(dispatch) {
      const url = 'http://localhost:3000/api/v1/assignments'

      const body = JSON.stringify(assignment)
      const jwtToken = localStorage.getItem("jwt")

      const headers = {
        method: 'post',
        body: body,
        headers: {
          "Authorization":`Bearer ${jwtToken}`,
          "Content-Type":"application/json",
          "Accept":"application/json"
        }
      }

      fetch(url, headers)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          dispatch({type: "CREATE_NEW_ASSIGNMENT", payload: json})
          history.push(`/user/${json.assignment.creator.id}`, json.success)
        } 
      })
    }
  }

export function getAllAssignments(){
  return function(dispatch) {
      const url = 'http://localhost:3000/api/v1/assignments'

      fetch(url)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          dispatch({type: "GET_ALL_ASSIGNMENTS", payload: json})
        } 
      })
    }
}

export function getAssignment(id){
  return function(dispatch){
    const url = `http://localhost:3000/api/v1/assignments/${id}`

    fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json.success){
        dispatch({type: "LOAD_ASSIGNMENT", payload: json})
      }
    })
  }
}

export function submitAssignment(answers, assignmentId){
  return function(dispatch){
    const url = `http://localhost:3000/api/v1/submitassignment/${assignmentId}`

    const body = JSON.stringify({answers: answers})
    const jwtToken = localStorage.getItem("jwt")

    const headers = {
      method: 'post',
      body: body,
      headers: {
        "Authorization":`Bearer ${jwtToken}`,
        "Content-Type":"application/json",
        "Accept":"application/json"
      }
    }

    fetch(url, headers)
    .then(res => res.json())
    .then(json => {
      if (json.success){
        dispatch({type: "USER_FINISHED_ASSIGNMENTS", payload: json})
      }
    })
  }
}


export function getTeacherAssignments(id){
    return function(dispatch){
    const url = `http://localhost:3000/api/v1/users/${id}/assignments`

    return fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json.success){
        dispatch({type: "GET_TEACHER_ASSIGNMENTS", payload: json})
      }
    })
  }
}

export function getStudentAssignments(id){
    return function(dispatch){
    const url = `http://localhost:3000/api/v1/users/${id}/assignedassignments`

    return fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json.success){
        dispatch({type: "GET_STUDENT_ASSIGNMENTS", payload: json})
      }
    })
  }
}


export function assign(studentId, assignmentId, dueDate) {
    return function(dispatch){
      const url = `http://localhost:3000/api/v1/assignments/assign`
      const body = JSON.stringify({student_id: studentId, assignment_id: assignmentId, due_date: dueDate})
      const jwtToken = localStorage.getItem("jwt")


       const headers = {
          method: 'post',
          body: body,
          headers: {
            "Authorization":`Bearer ${jwtToken}`,
            "Content-Type":"application/json",
            "Accept":"application/json"
          }
        }

      fetch(url, headers)
      .then(res => res.json())
      .then(json => {
        if (json.success){
          dispatch({type: "ASSIGN_ASSIGNMENT", payload: json})
        }
      })
    }
}

export function getAllIssuedAssignments(teacherId){
    return function(dispatch){
    const url = `http://localhost:3000/api/v1/users/${teacherId}/studentsassignments`

    return fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json.success){
        dispatch({type: "GET_ALL_STUDENT_ASSIGNMENTS", payload: json})
      }
    })
  }
}

export function clearTeacherData(){
  return function(dispatch){
    dispatch({type: "CLEAR_TEACHER_DATA"})
  }
}
