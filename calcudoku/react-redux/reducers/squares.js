import generatePuzzle from '../utilities/generatePuzzle'
import getRange from '../utilities/getRange'

const formattedSquare = (sq, N, activeSquare=0) => ({
  id: sq.id,
  hint: sq.hint,
  neighbors: [...sq.neighbors],
  groupId: sq.groupId || sq.group.id,
  bgColor: sq.bgColor || sq.group.color,
  answer: sq.digit || sq.answer,
  active: sq.id === activeSquare,
  candidates: getRange(N).map(x => sq.id*N + x),
  guess: sq.guess || 0,
  checked: false
});

const generateSquares = (N=5, previousSquares=generatePuzzle(),  activeSquare=0) => {
  const byId = [],
    allIds = previousSquares.map(sq => {
      byId[sq.id] = formattedSquare(sq, N, activeSquare);
      return sq.id;
    });
  return { allIds, byId };
}

const squares = (state = generateSquares(), action) => {
  const N = Math.sqrt(state.allIds.length);
  var newSquares = generateSquares(N, state.byId, action.squareId);
  var modifiedSquare = {};

  switch(action.type) {
    case 'GENERATE_NEW_PUZZLE':
      return generateSquares(action.puzzleSize, generatePuzzle(action.puzzleSize));

    case 'CHANGE_ACTIVE_SQUARE':
      return generateSquares(N, state.byId, action.id);

    case 'TOGGLE_CANDIDATE_SELECTED':
    case 'ERASE_GUESS':
      Object.assign(modifiedSquare, newSquares.byId[action.squareId], {
        guess: 0,
        checked: false
      });
      newSquares.byId[action.squareId] = modifiedSquare;
      return newSquares;

    case 'GUESS_SQUARE':
      Object.assign(modifiedSquare, newSquares.byId[action.squareId], {
        guess: action.digit,
        checked: false
      });
      newSquares.byId[action.squareId] = modifiedSquare;
      return newSquares;

    case 'CHECK_SQUARE':
      Object.assign(modifiedSquare, newSquares.byId[action.squareId], {
        checked: true
      });
      newSquares.byId[action.squareId] = modifiedSquare;
      return newSquares;

    case 'REVEAL_SQUARE':
      Object.assign(modifiedSquare, newSquares.byId[action.squareId], {
        guess: newSquares.byId[action.squareId].answer
      });
      newSquares.byId[action.squareId] = modifiedSquare;
      return newSquares;

    case 'CLEAR_PUZZLE':
      newSquares.byId = newSquares.byId.map(sq => Object.assign({}, sq, {
        candidates: [...sq.candidates],
        neighbors: [...sq.neighbors],
        guess: 0
      }));
      return newSquares;

    default:
      return state;
  }
}

export default squares
