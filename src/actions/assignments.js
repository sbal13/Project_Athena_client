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
          history.push('/profile', json.success)
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


export function deleteAssignment(){

}