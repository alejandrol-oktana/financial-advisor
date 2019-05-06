import './Chart.scss';
import React from 'react';
import { connect } from 'react-redux';

import Stroke from '../Stroke/Stroke';

class Chart extends React.Component {
  donut = {
    chartData: [],
    cx: 120,
    cy: 120,                      
    radius: 70,
    angleOffset: -90
  }
  colors = [
    { normal: "#8AEB8A", hover: "#A8EAA8" },
    { normal: "#EDE90B", hover: "#EDEB6D" },
    { normal: "#FFBA24", hover: "#FFD272" },
    { normal: "#FA7037", hover: "#F99970" },
    { normal: "#F55122", hover: "#F48B6E" },
  ]
  chartData = []
  
  dataPercentage(dataVal) {
    const dataTotal = this.props.riskData.reduce((acc, current) => acc + current.value, 0);
    return dataVal / dataTotal
  }

  degreesToRadians(angle) {
    return angle * (Math.PI / 180);
  }

  calculateTextCoords(value, angleOffset) {
    const { donut } = this;
    const angle = (this.dataPercentage(value) * 360) / 2 + angleOffset;
    const radians = this.degreesToRadians(angle);
    const textCoords = {
      x: (donut.radius * Math.cos(radians) + donut.cx),
      y: (donut.radius * Math.sin(radians) + donut.cy)
    }
    return textCoords;
  }

  calculateChartData() {
    this.chartData = [];
    this.props.riskData.forEach(current => {
      const { x, y } = this.calculateTextCoords(current.value, this.donut.angleOffset)
      const data = {
        degrees: this.donut.angleOffset,
        textX: x,
        textY: y
      }
      this.chartData.push(data);
      this.donut.angleOffset = this.dataPercentage(current.value) * 360 + this.donut.angleOffset;
    })
  }

  renderStrokes() {
    this.calculateChartData()
    const { donut, chartData } = this;
    const { riskData } = this.props;
    return riskData.map((current, index) => {
      if (current.value === 0) {
        return null;
      }
      return (
        <g key={index}>
          <Stroke
            donut = {donut}
            color = {this.colors[index]}
            data = {chartData[index]}
            riskData = {riskData[index]}
            percentage = {this.dataPercentage(riskData[index].value)}
           />
        </g>
      );
    });
  }

  render() {
    return(
      <svg  viewBox="0 0 240 240">
        {this.renderStrokes()}
        <g>
          <text textAnchor="middle" x="50%" y="50%" className="chart-number">
            Investment
          </text>
          <text textAnchor="middle" x="50%" y="50%" className="chart-label">
            Portfolio
          </text>
        </g>
      </svg>
    );
  }
}

const mapStateToProps = ({ portfolio }) => {
  return { selectedRisk: portfolio.selectedRisk}
}

export default connect(mapStateToProps)(Chart);