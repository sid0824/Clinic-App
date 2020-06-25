import React from 'react';

import { Spin, Icon } from 'antd';
import Circle from './Circle';
import Wrapper from './Wrapper';

import './Loading.scss';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const LoadingIndicator = () => (
  <div style={{ height: '100vh' }} className="pr-comp-loader">
    <Spin indicator={antIcon} />
  </div>
);

export default LoadingIndicator;
