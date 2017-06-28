import { combineReducers } from 'redux'
import activeSquare from './activeSquare'
import candidates from './candidates'
import puzzleSize from './puzzleSize'
import squares from './squares'
import writeMode from './writeMode'
import guesses from './guesses'

const calcudokuApp = combineReducers({
  activeSquare,
  candidates,
  puzzleSize,
  squares,
  writeMode,
  guesses
});

export default calcudokuApp;
