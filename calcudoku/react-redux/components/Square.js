import React from 'react'
import PropTypes from 'prop-types'
import CandidateTableContainer from '../containers/CandidateTableContainer'

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onClick, answer, guess, id, hint, candidates, checked, bgColor, active, groupId, neighborGroups } = this.props;
    var className = `square bg${bgColor}` +
      (!!guess ? ` answered` : ``) +
      (active ? ` active` : ``) +
      (checked && guess !== answer ? ` highlight` : ``) +
      (neighborGroups[3] != groupId ? ` bottom-border` : ``) +
      (neighborGroups[2] != groupId ? ` right-border` : ``);
    return (
      <div onClick={onClick(id)} className={className}>
        <p className={"absolute hint"}>{ hint }</p>
        <p className={"answer absolute"}>{ guess? guess : '' }</p>
        <CandidateTableContainer candidates={candidates} active={active} answered={!!guess}/>
      </div>
    )
  }
}

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  hint: PropTypes.string,
  active: PropTypes.bool.isRequired,
  guess: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  answer: PropTypes.number.isRequired
}

export default Square;
