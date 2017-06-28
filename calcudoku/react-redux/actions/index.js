export const generateNewPuzzle = puzzleSize => ({
  type: 'GENERATE_NEW_PUZZLE',
  puzzleSize
});

export const changeActiveSquare = id => ({
  type: 'CHANGE_ACTIVE_SQUARE',
  id
});

export const toggleCandidateSelected = ({squareId, candidateId}) => ({
  type: 'TOGGLE_CANDIDATE_SELECTED',
  squareId,
  candidateId
});

export const guessSquare = ({squareId, digit}) => ({
  type: 'GUESS_SQUARE',
  squareId,
  digit
});

export const eraseGuess = ({squareId}) => ({
  type: 'ERASE_GUESS',
  squareId
});

export const checkSquare = ({squareId}) => ({
  type: 'CHECK_SQUARE',
  squareId
});

export const revealSquare = ({squareId}) => ({
  type: 'REVEAL_SQUARE',
  squareId
});

export const clearCandidates = candidates => ({
  type: 'CLEAR_CANDIDATES',
  candidates
});

export const toggleWriteMode = () => ({
  type: 'TOGGLE_WRITE_MODE'
});

export const clearPuzzle = () => ({
  type: 'CLEAR_PUZZLE'
});
