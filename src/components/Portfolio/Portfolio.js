import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Table from '../Table/Table';
import RiskPreference from '../RiskPreference/RiskPreference';
import Chart from '../Chart/Chart';

class Portfolio extends React.Component {

  state = { isChartSelected: false}

  handleBody() {
    if (this.state.isChartSelected) {
      return (
        <div className="cell medium-6 medium-offset-1 small-12">
          <Chart 
            selectedRisk={this.props.selectedRisk}
            riskData={this.getCurrentRisk()}/>
        </div>
      )
    }
    return <div className="cell medium-10 medium-offset-1 small-12"><Table selectedRisk={this.props.selectedRisk}/></div>
  }

  getCurrentRisk() {
    const { selectedRisk } = this.props;
    const { riskList } = this.props;
    if (!selectedRisk) {
      const riskData = [];
      _.drop(riskList[0]).forEach(column => riskData.push({ ...column, value: 25 }));
      return riskData;
    }
    return _.drop(_.find(riskList, data => {
      return parseInt(data[0].value) === selectedRisk
    }))
  }
  
  render() {
    return (
      <div className="grid-x grid-margin-x">
        <div className="cell small-12 medium-8">
          <RiskPreference />
        </div>
        <div className="cell medium-4 small-12">
          <p>Show as chart?</p>
          <div className="switch large">
            <input className="switch-input" id="yes-no" type="checkbox" name="chartSwitch"
              checked={this.state.isChartSelected}
              onChange={e => this.setState({ isChartSelected: e.target.checked })}
            />
            <label className="switch-paddle" htmlFor="yes-no">
              <span className="show-for-sr">Show as chart?</span>
              <span className="switch-active" aria-hidden="true">Yes</span>
              <span className="switch-inactive" aria-hidden="true">No</span>
            </label>
          </div>
        </div>
        {this.handleBody()}
      </div>
    );
  }
};

const mapStateToProps = ({ portfolio }) => {
  return {
     riskList: portfolio.riskList,
     selectedRisk:portfolio.selectedRisk 
   };
}

export default connect(mapStateToProps)(Portfolio);