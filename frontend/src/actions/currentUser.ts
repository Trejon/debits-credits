export const setCurrentUser = (user: any) => {
  return {
    type: 'SET_CURRENT_USER',
    user
  }
}

export const clearCurrentUser = () => {
  return {
    type: 'CLEAR_CURRENT_USER'
  }
}


// ASYNC ACTIONS
export const getCurrentUser = () => {
  return (dispatch: any) => {
    return fetch('http://localhost:3001/api/v1/get_current_user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((response) => {
        if (response.error) {
          console.log("There was an error getting the current user", response.error);
        } else {
          dispatch(setCurrentUser(response));
        }
      })
      .catch(console.log);
  };
};

export const login = (credentials: any, history: any) => {
  return (dispatch: any) => {
    return fetch('http://localhost:3001/api/v1/login', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
      .then((res) => {
        return res.json()
      })
      .then((user) => {
        if (user.error) {
          alert(`There was an error logging in, ${user.error}`);
        } else {
          dispatch(setCurrentUser(user));
          history.push('/')
        }
      })
      .catch(console.log);
  }
};