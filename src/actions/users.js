export function addTeacher(teacherKey){
	return function(dispatch) {
      const url = 'https://athena-academics-api.herokuapp.com/api/v1/addteacher'

      const body = JSON.stringify({teacher_key: teacherKey})
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
          dispatch({type: "ADD_TEACHER", payload: json})
        } else {
        	alert(json.failure)
        }
      })
    }
}


export function getUser(id){
  return function(dispatch){
    const url = `https://athena-academics-api.herokuapp.com/api/v1/users/${id}`
    
    return fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json.success){
        dispatch({type: "GET_USER", payload: json})
      }
    })
  }
}

export function getUserTeachers(studentId){
  return function(dispatch){
    const url = `https://athena-academics-api.herokuapp.com/api/v1/users/${studentId}/teachers`
    
    return fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json.success){
        dispatch({type: "GET_USER_TEACHERS", payload: json})
      }
    })
  }
}

export function getUserStudents(teacherId){
  return function(dispatch){
    const url = `https://athena-academics-api.herokuapp.com/api/v1/users/${teacherId}/students`
    
    return fetch(url)
    .then(res => res.json())
    .then(json => {
      if (json.success){
        dispatch({type: "GET_USER_STUDENTS", payload: json})
      }

    })
  }
}
