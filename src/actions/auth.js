export function login(userData) {
    
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
        dispatch({type: "LOG_IN", payload: json})
      })
    }
  }

export function signup(userData) {
 	
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
        dispatch({type: "LOG_IN", payload: json})
      })
    }
}

export function logOut() {
    return {type: "LOG_OUT"}
  }


