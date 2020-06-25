import React, { Component } from 'react';
import * as d3 from 'd3';

import { Progress } from 'antd';

import './index.scss';

export class AccessDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ['rgb(100, 181, 0)', 'rgb(184, 237, 190)', 'rgb(67, 69, 96)'],
    };
  }

  render() {
    const data = [10, 30, 10];
    const svgWidth = '100%';
    const svgHeight = 50;
    const goal = 100;

    let percSoFar = 0;

    const totalTime = d3.sum(data);
    const bar_x = 0;

    const Chart = ({ svgWidth, svgHeight, goal, percSoFar, data }) => (
      <svg width={svgWidth} height={svgHeight}>
        {data.map((data, i) => (
          <Datum key={i} data={data} percSoFar={percSoFar} index={i} />
        ))}
      </svg>
    );

    const test = (d, totalTime) => {
      debugger;
      const prev_perc = percSoFar;
      const this_perc = 100 * (d / totalTime);
      percSoFar += this_perc;
      console.log(
        `percSoFar:${percSoFar}; this_perc:${this_perc}; prev_perc:${prev_perc};`,
      );
      return `${prev_perc}%`;
    };

    const chart_width = parseInt(d3.select(Chart));
    // const color = d3.scale.category20c();

    const Bar = ({ index, value, totalTime }) => (
      <g>
        <rect
          x={test(value, totalTime)}
          width={`${(value / totalTime) * 100}%`}
          height="20"
          rx="5"
          ry="5"
          fill="url(#lgrad)"
          className={value < 50 ? 'population-bar' : 'population-bar--emphasis'}
        />
        <line
          x1="43"
          y1="60"
          x2="43"
          y2="67"
          stroke="#9e9e9e"
          fill="red"
          strokeLinecap="butt"
        />
      </g>
    );

    const Datum = ({ data, index }) => (
      <g>
        <Bar index={index} value={data} totalTime={totalTime} />
      </g>
    );

    return (
      <div>
        <div className="pr-progress-access-device">
          <div className="row">
            {this.props.deviceData.map((i, index) =>
              i.average_val > 0 ? (
                <span
                  style={{ width: `${i.average_val - 5}%` }}
                  className={
                    index === 0
                      ? 'subc-status desktop'
                      : '' || index === 1
                      ? 'subc-status mobile'
                      : '' || index === 2
                      ? 'subc-status tab'
                      : ''
                  }
                >
                  <span className="title">
                    {i.label}
                    {/* {i.average_val}% */}
                  </span>
                  <Progress strokeWidth={15} showInfo={false} percent={100} />
                </span>
              ) : (
                ''
              ),
            )}
            {/* 
            <span style={{ width: '30%' }} className="subc-status mobile">
              <span className="title">Mobile 20%</span>
              <Progress strokeWidth={15} showInfo={false} percent={100} />
            </span>
            <span style={{ width: '30%' }} className="subc-status tab">
              <span className="title">Tab 10%</span>
              <Progress strokeWidth={15} showInfo={false} percent={100} />
            </span> */}
          </div>
        </div>

        <div className="pr-pie-chart">
          <div className="label-wrap">
            <ul>
              {this.props.deviceData.map((i, index) => (
                <li>
                  <span style={{ backgroundColor: this.state.colors[index] }} />
                  {i.label} <b> {i.average_val}%</b>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <Progress strokeLinecap="square" percent={75} /> */}
        {/* <Chart
          svgWidth={svgWidth}
          svgHeight={svgHeight}
          data={data}
          totalTime={totalTime}
        /> */}
      </div>
    );
  }
}

export default AccessDevice;
