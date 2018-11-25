import React, { Component } from 'react';
import Chart from "react-apexcharts";


class BarChart extends Component {
  constructor() {
    super();
    this.state = {
      options: {
        chart: {
          background: "#f4f4f4",
          foreColor: "#333"
        },
        xaxis: {
          categories: []
        },
        plotOptions: {
          bar: {
            horizontal: false
          }
        },
        fill: {
          colors: ["#cc2222"]
        },
        dataLabels: {
          enabled: true
        },
        title: {
          text: "",
          align: "center",
          margin: 20,
          offsetY: 20,
          style: {
            fontSize: "25px"
          }
        }
      },
      series: [{
        name: "",
        data: []
      }]
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      options: {
        xaxis: {
          categories: this.props.categories
        },
        title: {
          text: this.props.name
        }
      },
      series: [{
        data: this.props.data
      }]
    })
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        height="450"
        width="100%"
      />
    )
  }
}


export default BarChart;