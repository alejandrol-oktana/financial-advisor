import './Stroke.scss';
import React from 'react';

class Stroke extends React.Component {
  constructor(props) {
    super(props);
    this.strokeRef = React.createRef();
  }

  state = { color: this.props.color.normal,
            value: this.props.riskData.label,
            strokeWidth: 50
          }

  handleMouseOver = () => {
    const { percentage, color } = this.props;
    const percentageLabel = `${Math.round(percentage * 100)}%`;
    this.setState({
      value: percentageLabel,
      color: color.hover,
      strokeWidth: 55
    })
  }

  handleMouseOut = () => {
    const { color } = this.props;
    this.setState({
      color: color.normal,
      strokeWidth: 50
    })
    this.renderValue()
  }
  componentDidMount() {
    this.strokeRef.current.addEventListener('mouseover', this.handleMouseOver);
    this.strokeRef.current.addEventListener('mouseout', this.handleMouseOut);
    this.renderValue();
  }

  componentDidUpdate(prevProps) {
    const { percentage } = this.props;
    if (prevProps.percentage !== percentage) {
      this.renderValue();
    }
  }

  renderValue() {
    const { percentage, riskData } = this.props;
    if (percentage > 0.1) {
      this.setState({ value: riskData.label })
    } else {
      this.setState({ value: riskData.shortLabel })
    }
  }

  render() {
    const { donut, data, percentage } = this.props;
    const circumference = 2 * Math.PI * donut.radius;
    const adjustedCircumference = circumference - 2;
    const strokeDiff = percentage * circumference;
    const strokeDashOffset = circumference - strokeDiff;
    const rotate= `rotate(${data.degrees}, ${donut.cx}, ${donut.cy})`;
    return (
      <React.Fragment>
        <circle
          cx={donut.cx} cy={donut.cy} r={donut.radius} fill="transparent"
          stroke={this.state.color} strokeWidth={this.state.strokeWidth}
          strokeDasharray={adjustedCircumference}
          strokeDashoffset={strokeDashOffset}
          transform={rotate}
          className="stroke-segment"
          ref={this.strokeRef}
        ></circle>
        <text
          textAnchor="middle"
          dy="3px"
          x={data.textX}
          y={data.textY}
          className="stroke-segment-label"
        >
          {this.state.value}
        </text>
      </React.Fragment>
    )
  }
}

export default Stroke;