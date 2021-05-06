import React from "react";
import {Line} from "react-chartjs-2";

class LineInterpolationChart extends React.Component {
  render() {
    return (
      <Line
        responsive={true}
        height={this.props.height}
        data={this.props.data}
        options={this.props.options}
      />
    );
  }
}

export default LineInterpolationChart;
