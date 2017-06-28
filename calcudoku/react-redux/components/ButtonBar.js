import React from 'react'
import PropTypes from 'prop-types'
import Button from '../components/Button'

class ButtonBar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(evt){
    evt.preventDefault();
    this.action();
  }

  render() {
    const { puzzleSize, writeMode, activeSquare, clearPuzzle, revealSquare, checkSquare, generateNewPuzzle, toggleWriteMode } = this.props;
    return (
      <h6 className="button-bar">
        <div className="btn-group">
          <Button text="4x4" action={generateNewPuzzle(4)} selected={puzzleSize === 4} />
          <Button text="5x5" action={generateNewPuzzle(5)} selected={puzzleSize === 5} />
          <Button text="6x6" action={generateNewPuzzle(6)} selected={puzzleSize === 6} />
          <Button text="7x7" action={generateNewPuzzle(7)} selected={puzzleSize === 7} />
          <Button text="8x8" action={generateNewPuzzle(8)} selected={puzzleSize === 8} />
          <Button text="9x9" action={generateNewPuzzle(9)} selected={puzzleSize === 9} />
        </div>
        <div className="btn-group">
          <Button glyph="th" action={toggleWriteMode} selected={writeMode === "CANDIDATE_MODE"} />
          <Button glyph="pencil" action={toggleWriteMode} selected={writeMode === "GUESS_MODE"} />
        </div>
        <div className="btns">
          <Button glyph="ok" action={checkSquare({squareId: activeSquare})} />
          <Button glyph="eye-open" action={revealSquare({squareId: activeSquare})} />
          <Button glyph="asterisk" action={clearPuzzle} />
          <Button glyph="refresh" action={generateNewPuzzle(puzzleSize)} />
        </div>
      </h6>
    )
  }
}

ButtonBar.propTypes = {
  generateNewPuzzle: PropTypes.func.isRequired,
  toggleWriteMode: PropTypes.func.isRequired,
  clearPuzzle: PropTypes.func.isRequired,
  checkSquare: PropTypes.func.isRequired,
  revealSquare: PropTypes.func.isRequired
}

export default ButtonBar;
