import './RiskLevel.scss';
import React from 'react';
import { connect } from 'react-redux';
import { selectRisk } from '../../actions/index';

class RiskLevel extends React.Component {
  onRiskClick = e => {
    this.props.selectRisk(parseInt(e.target.innerHTML));
  }

  render() {
    return(
      <li
        onClick={this.onRiskClick}
        ref={this.riskRef}
        className={`${this.props.isSelected ? 'primary' : 'hollow secondary'} button`}
      >
        {this.props.number}
      </li>
    )
  }
}

export default connect(null, { selectRisk })(RiskLevel);