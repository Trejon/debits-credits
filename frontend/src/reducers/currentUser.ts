const currentUserReducer = (state = null || {}, action: any) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.user,
      };
    case 'CLEAR_CURRENT_USER':
      return null;

    default:
      return state;
  }
};

export default currentUserReducer;
