// @flow

import React from 'react';
import { CircularProgress } from 'material-ui';
import './loading.css';

const Loading = () => (
  <div className="loading-shading-mui">
    <CircularProgress className="loading-icon-mui" />
  </div>
);

export default Loading;
