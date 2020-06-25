import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import './index.scss';

export class CandidateGender extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { genderData } = this.props;
    return (
      <div ref={this.refCallback}>
        <div>
          {genderData.map(o => (
            <div className="pr-card-status text-left">
              <div className="gender-icon">
                <i
                  className={`icon-${o.type} ${
                    o.type === 'not-specified' ? 'icon-no-gender' : ''
                  }`}
                />
              </div>
              <div className="data-num">
                {o.average_val} %
                <span>
                  {o.label} ( {o.value} )
                </span>
              </div>
            </div>
          ))}

          {/* <div className="pr-card-status text-left">
            <div className="gender-icon">
              <i className="icon-female" />
            </div>
            <div className="data-num">
              50.5%
              <span>MALES (1214)</span>
            </div>
          </div>
          <div className="pr-card-status text-left">
            <div className="gender-icon">
              <i className="icon-no-gender" />
            </div>
            <div className="data-num">
              50.5%
              <span>MALES (1214)</span>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default CandidateGender;
