import { connect } from 'react-redux'
import { changeActiveSquare } from '../actions'
import Square from '../components/Square'

const mapStateToProps = (state, ownProps) => {
  var sq = state.squares.byId[ownProps.id];
  var newSq = {...sq};
  newSq.candidates = [...sq.candidates];
  // newSq.active = state.activeSquare === sq.id;
  newSq.neighborGroups = sq.neighbors.map(n => state.squares.byId[n].groupId);
  // newSq.guess = state.guesses[sq.id];
  return newSq;
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: id => (() => dispatch(changeActiveSquare(id)))
  }
}

const SquareContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Square)

export default SquareContainer
