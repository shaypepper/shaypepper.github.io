import React from 'react'
import PropTypes from 'prop-types'
import Candidate from '../components/Candidate'

const generateCandidateRows = ({ toggleCandidateSelected, candidates, active, answered, puzzleSize }) => {
  let rows = [[]];
  candidates.forEach((c, i) => {
    if (!(i%3)) { rows.push([]); }
    rows[rows.length-1].push(<Candidate
      id={c.id}
      digit={c.digit}
      key={c.digit}
      active={active}
      answered={answered}
      selected={c.selected}
      puzzleSize={puzzleSize}
      toggleCandidateSelected={toggleCandidateSelected}
    />)
  })
  return rows;
};


class CandidateTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // const { candidates, active, answered, puzzleSize } = this.props;
    const rows = generateCandidateRows(this.props);
    return (
      <div>
        <table>
          <tbody>
            {rows.map((row, i)=> {
              return (
                <tr key={i}>{row}</tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

CandidateTable.propTypes = {
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      digit: PropTypes.number.isRequired,
      selected: PropTypes.bool.isRequired,
    }).isRequired
  )
}

export default CandidateTable;
