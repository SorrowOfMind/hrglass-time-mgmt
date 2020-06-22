import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';

class PieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: this.props.taskTimes,
            options: {
                chart: {
                    type: 'donut',
                },
                tooltip: {
                    enabled: true,
                    y: {
                        formatter: val => this.props.formatTime(val)
                    }
                },
                responsive: [
                    {
                        breakpoint: 1320,
                        options: {
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }
                ],
                labels: this.props.taskNames,
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                                value: {
                                    formatter: val => this.props.formatTime(val)
                                },
                                total: {
                                    show: true,
                                    formatter: w => this.props.formatTime(w.globals.seriesTotals.reduce((a, b) => {return a + b}, 0))
                                }
                            }
                        }
                    }
                },
                title: {
                    text: 'Total time per task',
                    offsetX: 15
                }
            }
        };
    }

    componentWillReceiveProps ({taskTimes, taskNames}) {
        this.setState(prevState => ({
            series: taskTimes,
            options: {
                ...prevState.options,
                labels: taskNames
            }
        }))
    }

    render() {
        return (
            <ReactApexChart options={this.state.options} series={this.state.series} type="donut" height={350} className="pie-chart"/>
        )
    }
}

PieChart.propTypes = {
    taskTimes: PropTypes.array.isRequired,
    taskNames: PropTypes.array.isRequired
  }

export default PieChart;