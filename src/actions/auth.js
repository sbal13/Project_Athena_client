export function login(userData, history) {
    
    return function(dispatch) {
      const url = 'http://localhost:3000/api/v1/login'

      const body = JSON.stringify(userData)

      const headers = {
        method: 'post',
        body: body,
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        }
      }

      fetch(url, headers)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          dispatch({type: "LOG_IN", payload: json})
          history.push('/index', json.success)
        } 
      })
    }
  }

export function signup(userData, history) {
 	
    return function(dispatch) {
      const url = 'http://localhost:3000/api/v1/signup'

      const body = JSON.stringify(userData)

      const headers = {
        method: 'post',
        body: body,
        headers: {
          "Content-Type":"application/json",
          "Accept":"application/json"
        }
      }

      fetch(url, headers)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          dispatch({type: "LOG_IN", payload: json})
          history.push('/index', json.success)
        }
      })
    }
}

export function getUserData(jwt){

  
    return function(dispatch) {
      const url = 'http://localhost:3000/api/v1/getcurrentuser'

      const headers = {
        method: 'get',
        headers: {
          "Authorization":`Bearer ${jwt}`,
          "Accept":"application/json"
        }
      }

      fetch(url, headers)
      .then(res => res.json())
      .then(json => {
        if (json.success) {
          dispatch({type: "GET_CURRENT_USER", payload: json})
        }
      })
    }
}

export function logout(history) {
    history.push('/login')
    return {type: "LOG_OUT"}
  }



