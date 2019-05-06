import './CalculatorTable.scss';
import React from 'react';
import _ from 'lodash';

class CalculatorTable extends React.Component {

  renderDifferenceLabel(difference) {
    return (difference > 0) ? `+${difference}` : `${difference}`;
  }

  colorDifferenceLabel(difference) {
    return (difference >= 0) ? 'green' : 'red';
  }

  renderHeader() {
    const { riskData } = this.props;
    if (riskData) {
      return riskData.map(({ label }, index) => <th key={index}>{`${label} $`}</th>)
    }
  }

  renderDifference() {
    const { riskData } = this.props;
    if (!riskData || riskData[0].current ===  null)  {
      return _.times(5, number => <td key={number}></td>);
    }

    return(
      riskData.map(({ difference }, index) => {
        return <td key={index} style={{ color: this.colorDifferenceLabel(difference)}}>{this.renderDifferenceLabel(difference)}</td>
      })
    );
  }

  renderNewAmount() {
    const { riskData } = this.props;
    if (!riskData || riskData[0].current === null)  {
      return _.times(5, number => <td key={number}></td>)
    }

    return(
      riskData.map(({ newAmount }, index) => {
        return <td key={index} style={{ color: 'blue'}}>{newAmount}</td>
      })
    );
  }

  render() {
    return (
      <table className="stack">
        <thead>
          <tr>
            <th></th>
            {this.renderHeader()}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Difference</td>
            {this.renderDifference()}
          </tr>
          <tr>
            <td>New Amount</td>
            {this.renderNewAmount()}
          </tr>

        </tbody>
      </table>
    );
  }
};

export default CalculatorTable;