import React, { Component } from 'react';
import * as d3 from 'd3';
import _ from 'lodash';
import { Col, Progress } from 'antd';
import Card from 'components/Card';

const data = {
  Days: 0.95,
  TestA: 0.75,
  TestB: 0.45,
  TestC: 0.15,
};

class ProgressArc extends React.Component {
  componentDidMount() {
    this.addArc();
    this.addArc().remove();
    this.addArc()
      .transition()
      .duration(1000)
      .call(this.arcTween, 2 * Math.PI * this.props.data.value, this.arc());
  }

  getSVG = () => d3.select(`#${this.props.arcID}`).select('g');

  arc = () => {
    const { width, height, pathStyle } = this.props;
    const radius = Math.min(width, height) / 2;
    return d3
      .arc()
      .innerRadius(radius - pathStyle.width)
      .outerRadius(radius)
      .startAngle(0);
  };

  addArc = () => {
    const { pathStyle } = this.props;
    return this.getSVG()
      .append('path')
      .datum({ endAngle: 0 })
      .style('fill', pathStyle.fill)
      .attr('d', this.arc());
  };

  arcTween = (transition, newAngle, arc) => {
    transition.attrTween('d', d => {
      const interpolate = d3.interpolate(d.endAngle, newAngle);
      const newArc = d;
      return t => {
        newArc.endAngle = interpolate(t);
        return arc(newArc);
      };
    });
  };

  render() {
    const { width, height, arcID, data } = this.props;
    return (
      <svg id={arcID} height={width} width={height}>
        <g transform={`translate(${width / 2},${height / 2})`}>
          <circle strokeWidth="10" r="65" fill="none" stroke="#F5F5F5" />
        </g>
        <g transform={`translate(${width / 2},${height / 2})`} />
        <g transform={`translate(${width / 2},${height / 2})`}>
          <text
            style={{
              textAnchor: 'middle',
            }}
          >
            <tspan x="0" dy="0" className={this.props.valueClass}>
              {`${(data.value * 100).toFixed(0)}`}
            </tspan>
            <tspan x="0" dy="20" className={this.props.labelClass}>
              {data.text}
            </tspan>
          </text>
        </g>
      </svg>
    );
  }
}

class Tile extends React.Component {
  getStyles = () => ({
    tile: {
      width: 500,
      height: 250,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#ffffff',
    },
    title: {
      borderBottom: '1px solid #D5DCE4',
      width: '100%',
      height: 30,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    text: {
      fontSize: '1em',
      marginLeft: 20,
    },
  });

  render() {
    const styles = this.getStyles();
    return (
      <div
        className={this.props.outerClass}
        style={Object.assign({}, styles.tile, this.props.tileStyle)}
      >
        {this.props.content}
      </div>
    );
  }
}

class ProgressCircleLoop extends React.Component {
  render() {
    return (
      <div className="summary">
        {_.map(data, (value, key) => {
          let percentage;
          if (value > 1) {
            percentage = 1;
          } else if (value < 0) {
            percentage = 0;
          } else {
            percentage = value;
          }
          return (
            <Col span={6}>
              <Card>
                <Tile
                  key={key}
                  tileStyle={{
                    width: 180,
                    height: 180,
                    flexShrink: 0,
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto',
                  }}
                  content={
                    <ProgressArc
                      key={key}
                      data={{
                        value: percentage,
                        text: key,
                      }}
                      arcID={`test--svg--${key}`}
                      height={140}
                      width={140}
                      pathStyle={{
                        width: 10,
                        fill: '#84BD00',
                      }}
                      valueClass="summary--tiles--value"
                      labelClass="summary--tiles--label"
                    />
                  }
                />
              </Card>
            </Col>
          );
        })}
      </div>
    );
  }
}

export default ProgressCircleLoop;
