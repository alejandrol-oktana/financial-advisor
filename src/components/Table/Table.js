import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import Row from '../Row/Row';

class Table extends React.Component {
  renderBody() {
    const { riskList, selectedRisk, filter } = this.props;
    if (riskList.length > 0) {
      // Resolve if filter.
      if (filter && selectedRisk) {
        const data = _.find(riskList, data => {
          return data[0].value === selectedRisk
        });
        return <Row key={data[0].value} data={data}></Row>
      }

      // Else no filter.
      return riskList.map(data => {
        return (
          <Row
            key={data[0].value}
            data={data} 
            selectedRisk={selectedRisk}
           />
        );
      });
    }
  }

  render() {
    return (
      <table className="scroll">
        <thead>
          <tr>
            <th>Risk</th>
            <th>Bonds %</th>
            <th>Large Cap %</th>
            <th>Mid Cap %</th>
            <th>Foreign %</th>
            <th>Small Cap %</th>
          </tr>
        </thead>
        <tbody>
          {this.renderBody()}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = ({ portfolio }) => {
  return { riskList: portfolio.riskList };
}

export default connect(mapStateToProps)(Table);