import React from 'react'
import PropTypes from 'prop-types'
import SquareContainer from '../containers/SquareContainer'
import ButtonBarContainer from '../containers/ButtonBarContainer'
import getRange from '../utilities/getRange'

class Puzzle extends React.Component {
  constructor(props) {
    super(props);
  }

  onKeyDown(evt){
    let {puzzleSize, candidateMode, activeSquare, writeMode} = this.props;
    evt.preventDefault();
    var i = 4;
    switch(evt.key){
      case ' ':
        return this.props.toggleWriteMode();

      case 'Backspace':
        if (activeSquare.guess){
          return this.props.eraseGuess({ squareId: activeSquare.id});
        } else {
          return this.props.clearCandidates(activeSquare.candidates);
        }

      case 'ArrowLeft':
        i--;
      case 'ArrowUp':
        i--;
      case 'ArrowRight':
        i--;
      case 'ArrowDown':
        i--;
        return this.props.changeActiveSquare(activeSquare.neighbors[i]);

      default:
        if (!!+evt.key && getRange(puzzleSize+1).includes(+evt.key)){
          if (writeMode === "CANDIDATE_MODE") {
            return this.props.toggleCandidateSelected({
              candidateId: activeSquare.id*puzzleSize + (+evt.key) - 1,
              squareId: activeSquare.id
            });
          } else {
            return this.props.guessSquare({
              squareId: activeSquare.id,
              digit: +evt.key
            });
          }
        }
    }
  }

  componentDidMount(){
    window.addEventListener("keydown", this.onKeyDown.bind(this));
  }

  render() {
    const { squareIds, puzzleSize, win } = this.props;

    return (
      <div id="wrapper"
        className={`puzzle ${win? 'win': ''}`}
        style={{"--N": puzzleSize}}
      >
      <h1>{"calcudoku"}</h1>
      <ButtonBarContainer />
        {squareIds.map((sqId,k) => {
          let j = k % puzzleSize,
            i = (k-j)/puzzleSize;
          return (
            <SquareContainer id={ k } key={ k }/>
          )
        })}
      </div>
    )
  }
}

Puzzle.propTypes = {
  squareIds: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  puzzleSize: PropTypes.number.isRequired
}

export default Puzzle;
