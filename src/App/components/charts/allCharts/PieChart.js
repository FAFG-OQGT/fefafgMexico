import React from "react";
import {Pie} from "react-chartjs-2";

class PieChart extends React.Component {
  render() {
    return <Pie data={this.props.data} responsive={true} height={300} options={this.props.options} id={this.props.id || ""} />;
  }
}

export default PieChart;
