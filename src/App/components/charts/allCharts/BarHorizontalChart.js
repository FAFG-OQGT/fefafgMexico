import React from "react";
import {HorizontalBar} from "react-chartjs-2";

class BarHorizontalChart extends React.Component {
  render() {
    return (
      <HorizontalBar
        data={this.props.data}
        options={this.props.options}
        height={400}
        width={null}
        responsive={true}
      />
    );
  }
}

export default BarHorizontalChart;
