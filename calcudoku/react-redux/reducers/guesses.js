import { zeros } from '../utilities';

const guesses = (state = zeros(25), action) => {
  let id;
  switch(action.type){
    case 'TOGGLE_CANDIDATE_SELECTED':
    case 'ERASE_GUESS':
      id = action.squareId;
      return [...state.slice(0, id), 0, ...state.slice(id + 1)];

    case 'GUESS_SQUARE':
      id = action.squareId;
      return [...state.slice(0, id), action.digit , ...state.slice(id + 1)];

    default:
      return state;
  }
};

export default guesses;
