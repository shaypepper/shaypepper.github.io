const puzzleSize = (state = 5, action) => {
  switch(action.type){
    case 'GENERATE_NEW_PUZZLE':
      return action.puzzleSize;
    default:
      return state;
  }
}

export default puzzleSize
