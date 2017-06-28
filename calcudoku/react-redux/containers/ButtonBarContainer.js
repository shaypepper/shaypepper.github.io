import { connect } from 'react-redux'
import ButtonBar from '../components/ButtonBar'
import { generateNewPuzzle, toggleWriteMode, checkSquare, revealSquare, clearPuzzle } from '../actions'
import {  } from '../utilities'

const something = () => {};

const mapStateToProps = (state, ownProps) => {
  return {
    writeMode: state.writeMode,
    puzzleSize: state.puzzleSize,
    activeSquare: state.activeSquare
  };
}

const mapDispatchToProps = dispatch => {
  return {
    generateNewPuzzle: n => () => dispatch(generateNewPuzzle(n)),
    toggleWriteMode: () => dispatch(toggleWriteMode()),
    clearPuzzle: () => dispatch(clearPuzzle()),
    checkSquare: args => () => dispatch(checkSquare(args)),
    revealSquare: args => () => dispatch(revealSquare(args))
  }
}

const ButtonBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ButtonBar)

export default ButtonBarContainer
