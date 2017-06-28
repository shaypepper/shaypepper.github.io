import React from 'react'
import PropTypes from 'prop-types'

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick(evt){
    evt.preventDefault();
    this.action();
  }

  render() {
    const { action, glyph, selected, text } = this.props;
    const className = `btn btn-md ${selected? 'selected' : ''}`
    return (
      <button className={className} onClick={() => (selected || action.bind(this)())}>
        { glyph?
          <span className={`glyphicon glyphicon-${glyph}`}></span> :
          ''
        }
        {text || ''}
      </button>
    )
  }
}

Button.propTypes = {
  action: PropTypes.func.isRequired,
  glyph: PropTypes.string,
  selected: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.string
}

export default Button;
