import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Styles from './Styles';

const Loading = ({ classes }) => (
  <div className={classes.root}>
    <LinearProgress />
  </div>
);

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(Loading);
