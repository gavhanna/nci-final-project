import React, { Component } from 'react'
import Chart from "react-apexcharts";

class DonutChart extends Component {
  constructor() {
    super();
    this.state = {
      options: {
        title: {
          text: "",
          align: "center",
          margin: 20,
          offsetY: 20,
          style: {
            fontSize: "25px"
          }
        },
        labels: [],
      },
      series: [],
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      options: {
        title: {
          text: this.props.text,
        },
        labels: this.props.labels
      },
      series: this.props.series
    })
  }


  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="pie"
        height="300"
        width="100%"
      />
    )
  }
}


export default DonutChart;