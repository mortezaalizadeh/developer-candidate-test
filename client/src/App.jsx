import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core';
import withRoot from './sharedComponents/withRoot';
import { EverybodyContainer, MaleContainer, FemaleContainer, Over30Container, Under30Container } from './app/pages';
import Styles from './Styles';
import './App.css';

const history = createBrowserHistory();

class App extends Component {
  state = {
    snackbar: {
      open: false,
      errorMessageToDisplay: null,
    },
  };

  showSnackbar = errorMessageToDisplay => {
    this.setState({ snackbar: { open: true, errorMessageToDisplay } });
  };

  handleRequestCloseSnackbar = () => {
    this.setState({ snackbar: { open: false, errorMessageToDisplay: null } });
  };

  render = () => {
    const { classes } = this.props;
    const { snackbar } = this.state;

    return (
      <Router history={history}>
        <div className={classes.root}>
          <Route path="/" exact component={EverybodyContainer} />
          <Route path="/everybody" exact component={EverybodyContainer} />
          <Route path="/male" exact component={MaleContainer} />
          <Route path="/female" exact component={FemaleContainer} />
          <Route path="/over30" exact component={Over30Container} />
          <Route path="/under30" exact component={Under30Container} />
          <Snackbar
            open={snackbar.open}
            onRequestClose={this.handleRequestCloseSnackbar}
            transition={Fade}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{snackbar.errorMessageToDisplay}</span>} />
        </div>
      </Router>
    );
  };
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {};
}

export default withRoot(
  withStyles(Styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(App),
  ),
);
