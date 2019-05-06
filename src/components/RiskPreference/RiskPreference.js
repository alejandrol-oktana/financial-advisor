import './RiskPreference.scss';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

import RiskLevel from '../RiskLevel/RiskLevel';

class RiskPreference extends React.Component {
  renderList() {
   return ( 
    _.times(10, number => {
        return (
        <RiskLevel
          number={number + 1}
          key={number + 1}
          isSelected={this.props.selectedRisk === number + 1}
        >
        </RiskLevel>
        )
    })) 
  }

  handleContinue = e => {
    e.preventDefault();
    if (this.props.selectedRisk !== null ) {
      this.props.history.push('/calculator', { selectedRisk: this.props.selectedRisk });
    }
  }

  render() {
    return(
      <div>
        <h5>Please select a risk level for your investment portfolio</h5>
        <ul className="button-group align-justify risk-levels">
          <div id="risk-labels">
            <p>Low</p>
            <p id="risk-label-high">High</p>
          </div>
          {this.renderList()}
          <button
            className="button"
            disabled={this.props.selectedRisk === null}
            onClick={this.handleContinue}
          >
            Continue
          </button>
        </ul>
      </div>
    ) 
  }
};

const mapStateToProps = ({ portfolio }) => {
  return { selectedRisk: portfolio.selectedRisk }
}

export default connect(mapStateToProps)(withRouter(RiskPreference));