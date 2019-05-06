import './Row.scss';
import React from 'react';

class Row extends React.Component {

  renderColumns() {
    return this.props.data.map(({ label, value }) => {
      return <th key={label}>{value}</th>
    }) 
  }

  render() {
    const { data, selectedRisk } = this.props;
    const selectedRow = (selectedRisk === data[0].value) ? 'selected-risk-row' : '';
    return (
      <tr id={selectedRow}>
        {this.renderColumns()}
      </tr>
    )
  }
}

export default Row;