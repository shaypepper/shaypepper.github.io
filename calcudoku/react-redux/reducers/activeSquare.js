const activeSquare = (state = 0, action) => {
  switch(action.type){
    case 'GENERATE_NEW_PUZZLE':
      return 0;
    case 'CHANGE_ACTIVE_SQUARE':
      return action.id;
    default:
      return state;
  }
}

export default activeSquare
