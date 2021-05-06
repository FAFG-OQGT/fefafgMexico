import React from "react";
import {Bar} from "react-chartjs-2";

class BarBasicChart extends React.Component {
  render() {
    return (
      <Bar
        data={this.props.data}
        options={{
          ...this.props.options,
        }}
        height={500}
        width={null}
        id={this.props.id || ""}
        responsive={true}
      />
    );
  }
}

export default BarBasicChart;
