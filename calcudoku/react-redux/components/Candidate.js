import React from 'react'
import PropTypes from 'prop-types'

class Candidate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { digit, className, toggleCandidateSelected, active, answered, selected, puzzleSize, id } = this.props;
    return (
      <td className={`candidates` + (selected ? ` selected` : `` )}
        onClick={()=>  {if (active) toggleCandidateSelected.bind(this)({
          squareId: (id - digit + 1) / puzzleSize,
          candidateId: id
        })}}
      >
        {digit}
      </td>
    )
  }
}

Candidate.propTypes = {
  digit: PropTypes.number.isRequired,
  selected: PropTypes.bool.isRequired
}

export default Candidate;
