import './Calculator.scss';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { initRiskList } from '../../actions';
import { loadData } from '../../services/fileManager';

import Table from '../Table/Table';
import CalculatorTable from '../CalculatorTable/CalculatorTable';
import CalculatorForm from '../CalculatorForm/CalculatorForm';

class Calculator extends React.Component {

  state = { 
    riskData: null,
    movementList: null
  }

  generateMovements(riskData) {
    let positives = _.chain(riskData)
      .filter(({ difference }) => difference > 0)
      .map(({ label, difference }) => {return { label, difference }})
      .orderBy(['difference'], ['asc']).value();
    let negatives = _.chain(riskData)
      .filter(({ difference }) => difference < 0)
      .map(({ label, difference }) => {return { label, difference }})
      .orderBy(['difference'], ['asc']).value();

    let movementList = [];
    let i = 0;

    for(let i = 0; i < negatives.length; i++) {
      for(let j = 0; j < positives.length; j++) {
        if (positives[j].difference === Math.abs(negatives[i].difference)) {
          let moveValue = positives[j].difference;
          movementList.push({
            from: negatives[i].label,
            to: positives[j].label,
            value: _.round(moveValue, 2)
          })
          positives[j].difference -= moveValue;
          negatives[i].difference += moveValue;
        }
      }
    }

    while(i < negatives.length) {
      let j = 0;
      while(j < positives.length && negatives[i].difference < 0) {
        if (positives[j].difference > 0) {
          let moveValue = Math.min(Math.abs(negatives[i].difference), positives[j].difference);
          movementList.push({
            from: negatives[i].label,
            to: positives[j].label,
            value: _.round(moveValue, 2)
          })
          positives[j].difference -= moveValue;
          negatives[i].difference += moveValue;
        }
        j += 1;
      }
      i += 1;
    }

    movementList = _.orderBy(movementList, ['value'], ['asc']);
    this.setState({ movementList });
  }

  renderMovementList() {
    if (!this.state.movementList) { return null};
    return (
      this.state.movementList.map((movement, index) => {
        return <li key={index} >{`Transfer $${movement.value} from ${movement.from} to ${movement.to}`}</li>
      })
    )
  }

  toDollars(current, total) {
    return total * current / 100;
  }

  onFormSubmit = form => {
    const { riskData } = this.state;
    const newRiskData = [];
    if (form) {
      const total = _.values(form).reduce((acc, val) => acc + parseInt(val), 0);
      riskData.forEach(column => {
        const current = parseInt(form[column.key]);
        const expected = this.toDollars(column.expected, total);
        const difference = _.round(expected - current, 2);
        const newAmount = _.round(current + difference, 2);
        newRiskData.push({ ...column, current, difference, newAmount });
      });
      this.generateMovements(newRiskData);
      this.setState({ riskData: newRiskData })
    } else {
      riskData.forEach(column => {
        newRiskData.push({ ...column, current: null, difference: null, newAmount: null });
      });
      this.setState({ riskData: newRiskData, movementList: null })
    }
  }

  async componentDidMount() {
    this.props.initRiskList(await loadData());
    const { selectedRisk } = this.props.history.location.state;
    const temp = _.find(this.props.riskList, data => {
      return parseInt(data[0].value) === selectedRisk
    });
    const riskData = [];
    _.drop(temp).forEach(column => riskData.push(_.omit({ ...column, expected: column.value, current: null }, 'value')));
    this.setState({ riskData })
  }

  render() {
    const { selectedRisk } = this.props.history.location.state;
    return (
      <div className="grid-x grid-margin-x">
        <div className="small-12 cell">
          <h3 id="calculator-title"><b>Custom portfolio</b></h3>
        </div>
        <div className="small-12 cell">
          <Table filter selectedRisk={selectedRisk} />
        </div>
        <div className="small-12 cell">
          <h4>Please enter your current portfolio</h4>
        </div>
        <div className="medium-8 medium-offset-2 small-12 cell">
          <CalculatorForm onFormSubmit={this.onFormSubmit} riskData={this.state.riskData} />
        </div>
        <div className="medium-8 medium-offset-1 small-12 cell">
         <CalculatorTable riskData={this.state.riskData} />
        </div>
        <div className="medium-8 medium-offset-1 small-12 cell">
          <ul>
            {this.renderMovementList()}
          </ul>
        </div>
      </div> 
    );
  }
};

const mapStateToProps = ({ portfolio }) => {
  return { riskList: portfolio.riskList };
}

export default connect(mapStateToProps, { initRiskList })(withRouter(Calculator));