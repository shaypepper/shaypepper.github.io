import { connect } from 'react-redux'
import CandidateTable from '../components/CandidateTable'
import { toggleCandidateSelected } from '../actions'
import { squareIdFromCandidateId } from '../utilities'

const mapStateToProps = (state, ownProps) => {
  let N = state.puzzleSize;
  return {
    active: ownProps.active,
    answered: ownProps.answered,
    candidates: ownProps.candidates.map(c => state.candidates[c]),
    puzzleSize: state.puzzleSize
  };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleCandidateSelected: args => {console.log(dispatch(toggleCandidateSelected(args)))}
  }
}

const CandidateTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CandidateTable)

export default CandidateTableContainer
