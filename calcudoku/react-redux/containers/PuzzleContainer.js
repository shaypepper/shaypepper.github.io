import { connect } from 'react-redux'
import { guessSquare, eraseGuess, toggleCandidateSelected,
  changeActiveSquare, clearCandidates, toggleWriteMode } from '../actions'
import Puzzle from '../components/Puzzle'

const mapStateToProps = state => {
  return {
    squareIds: state.squares? state.squares.allIds : [],
    puzzleSize: state.puzzleSize,
    writeMode: state.writeMode,
    activeSquare: state.squares.byId[state.activeSquare],
    win: state.squares.byId.every(sq => sq.guess == sq.answer)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    guessSquare:              args => dispatch(guessSquare(args)),
    eraseGuess:               args => dispatch(eraseGuess(args)),
    changeActiveSquare:       args => dispatch(changeActiveSquare(args)),
    clearCandidates:          args => dispatch(clearCandidates(args)),
    toggleWriteMode:          args => dispatch(toggleWriteMode(args)),
    toggleCandidateSelected:  args => dispatch(toggleCandidateSelected(args))
  }
}

const PuzzleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Puzzle)

export default PuzzleContainer
