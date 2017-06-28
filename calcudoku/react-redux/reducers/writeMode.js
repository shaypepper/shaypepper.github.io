const writeMode = (state = 'CANDIDATE_MODE', action) => {
  switch(action.type){
    case 'TOGGLE_WRITE_MODE':
      return state === 'CANDIDATE_MODE'? 'GUESS_MODE' : 'CANDIDATE_MODE'
    default:
      return state;
  }
}

export default writeMode
