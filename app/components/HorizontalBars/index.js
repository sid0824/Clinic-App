import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import './index.scss';

export class HorizontalBars extends Component {
  constructor(props) {
    super(props);
  }

  refCallback = element => {
    if (element) {
      this.props.getSize(element.getBoundingClientRect());
    }
  };

  // componentDidUpdate() {
  //   if (this.doReportSize) {
  //     this.props.getSize(this.elementRef.getBoundingClientRect());
  //     this.doReportSize = false;
  //   }
  // }

  render() {
    const data = this.props.ages;
    const svgWidth = this.props.block_size.width;
    const svgHeight = 245;
    const textWidth = 45;
    const textGutter = 7;
    const barMargin = 30;

    const xScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([textWidth, svgWidth - textWidth]);

    const yScale = d3
      .scaleLinear()
      .domain([0, data.length])
      .range([0, svgHeight]);

    const barHeight = yScale(1) - barMargin;

    const DatumText = ({
      textWidth,
      textGutter,
      barMargin,
      barHeight,
      yScale,
      index,
      age,
    }) => (
      <text
        className="svg-age"
        x={textWidth - textGutter}
        y={yScale(index) + barMargin / 2 - 5}
        textAnchor="end"
      >
        {age}
      </text>
    );

    const DatumBar = ({
      textWidth,
      barHeight,
      yScale,
      xScale,
      index,
      value,
    }) => (
      <rect
        x={textWidth}
        y={yScale(index)}
        width="0"
        height={barHeight}
        rx="5"
        ry="5"
        fill="url(#lgrad)"
        className={value < 50 ? 'population-bar' : 'population-bar--emphasis'}
      >
        <animate
          attributeName="width"
          from="0"
          to={xScale(value) - 44}
          dur="1s"
          calcMode="linear"
          fill="freeze"
        />
      </rect>
    );

    const DatumNumber = ({
      textWidth,
      textGutter,
      barMargin,
      barHeight,
      yScale,
      xScale,
      index,
      value,
    }) => (
      <text
        className="svg-age-data"
        x={textWidth + xScale(value) + 3 * textGutter - 20}
        y={yScale(index) + barMargin / 2 - 5}
        textAnchor="end"
      >
        {value}%
      </text>
    );

    const test = () => {};
    const Datum = ({
      datum,
      index,
      textWidth,
      textGutter,
      barMargin,
      barHeight,
      yScale,
      xScale,
    }) => (
      <g>
        <DatumText
          textWidth={textWidth}
          textGutter={textGutter}
          barMargin={barMargin}
          barHeight={barHeight}
          yScale={yScale}
          index={index}
          age={datum.age}
        />
        <DatumBar
          textWidth={textWidth}
          barHeight={barHeight}
          yScale={yScale}
          xScale={xScale}
          index={index}
          value={datum.value}
        />

        <DatumNumber
          textWidth={textWidth}
          textGutter={textGutter}
          barMargin={barMargin}
          barHeight={barHeight}
          yScale={yScale}
          xScale={xScale}
          index={index}
          value={datum.value}
        />
      </g>
    );

    const Chart = ({
      svgWidth,
      svgHeight,
      textWidth,
      textGutter,
      barMargin,
      barHeight,
      yScale,
      xScale,
      data,
    }) => (
      <svg width={svgWidth} height={svgHeight}>
        <defs>
          <linearGradient id="lgrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(220,247,224)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(148,231,158)" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d="M45,220 v-230"
          fill="transparent"
          stroke="#9e9e9e"
          strokeWidth="0.5"
          className="thin-border"
        />
        <line
          x1="43"
          y1="26"
          x2="43"
          y2="27"
          stroke="#9e9e9e"
          strokeLinecap="butt"
        />
        <line
          x1="43"
          y1="66"
          x2="43"
          y2="67"
          stroke="#9e9e9e"
          strokeLinecap="butt"
        />
        <line
          x1="43"
          y1="106"
          x2="43"
          y2="107"
          stroke="#9e9e9e"
          strokeLinecap="butt"
        />
        <line
          x1="43"
          y1="146"
          x2="43"
          y2="147"
          stroke="#9e9e9e"
          strokeLinecap="butt"
        />
        <line
          x1="43"
          y1="186"
          x2="43"
          y2="187"
          stroke="#9e9e9e"
          strokeLinecap="butt"
        />
        {data.map((datum, i) => (
          <Datum
            key={i}
            datum={datum}
            index={i}
            textWidth={textWidth}
            textGutter={textGutter}
            barMargin={barMargin}
            barHeight={barHeight}
            yScale={yScale}
            xScale={xScale}
          />
        ))}
      </svg>
    );
    return (
      <div ref={this.refCallback}>
        <div>
          <div className="pr-card-status text-left">
            <div className="data-num">
              29
              <span>years old</span>
            </div>
          </div>
        </div>
        <Chart
          svgWidth={svgWidth}
          svgHeight={svgHeight}
          textWidth={textWidth}
          textGutter={textGutter}
          barMargin={barMargin}
          barHeight={barHeight}
          yScale={yScale}
          xScale={xScale}
          data={this.props.ages}
        />
      </div>
    );
  }
}

export default HorizontalBars;
