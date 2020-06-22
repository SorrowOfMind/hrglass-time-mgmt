import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';

class Chart extends Component {
    constructor (props) {
        super (props);
        this.state = {
            series: [{
                name: 'time spent',
                data: this.props.times
              }],
            options: {
                chart: {
                  height: 450,
                  type: 'bar',
                },
                plotOptions: {
                  bar: {
                    columnWidth: '50%',
                    dataLabels: {
                      position: 'top', // top, center, bottom
                    },
                  }
                },
                dataLabels: {
                  enabled: true,
                  formatter: val => this.props.formatTime(val),
                  offsetY: -20,
                  style: {
                    colors: ['#323232'],
                  }
                },
                colors: ['#0e8ede'],
                xaxis: {
                  categories: this.props.dates,
                  position: 'bottom',
                  axisBorder: {
                    show: false
                  },
                  axisTicks: {
                    show: false
                  },
                  crosshairs: {
                    fill: {
                      type: 'gradient',
                      gradient: {
                        colorFrom: '#0e8ede',
                        colorTo: '#fff',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                      }
                    }
                  },
                  tooltip: {
                    enabled: true,
                  }
                },
                yaxis: {
                  axisBorder: {
                    show: false
                  },
                  axisTicks: {
                    show: false,
                  },
                labels: {
                        show: false,
                        formatter: val => this.props.formatTime(val)
                      }
                },
                title: {
                    text: 'Total time per day',
                    offsetX: 15
                }
            }
        }
    }

    componentWillReceiveProps ({times, dates}) {
        this.setState(prevState => (
            {series: [{...prevState.series, data: times}], 
            options: {...prevState.options, xaxis: {...prevState.options.xaxis, categories: dates}}}
            ))
      }

    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} className="chart"/>
        )
    }
}

Chart.propTypes = {
  times: PropTypes.array.isRequired,
  dates: PropTypes.array.isRequired
}

export default Chart;
