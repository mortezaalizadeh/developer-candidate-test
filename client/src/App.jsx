import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core';
import { Map } from 'immutable';
import withRoot from './sharedComponents/withRoot';
import { EverybodyContainer, MaleContainer, FemaleContainer, Over30Container, Under30Container } from './app/pages';
import * as personApiActions from './api/person/Actions';
import { MessageBarContent } from './sharedComponents/messageBar';
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

  static getDerivedStateFromProps = ({ personApiFailedOperations, personApiActions }) => {
    const errorMessageToDisplay = personApiFailedOperations.reduce((reduction, value) => reduction + value.get('errorMessage') + '\n', '');

    personApiFailedOperations.keySeq().forEach(operationId => {
      personApiActions.acknowledgeFailedOperation(Map({ operationId }));
    });

    return errorMessageToDisplay === '' ? null : { snackbar: { open: true, errorMessageToDisplay } };
  };

  handleRequestCloseSnackbar = () => {
    this.setState({ snackbar: { open: false, errorMessageToDisplay: null } });
  };

  render = () => {
    const { classes } = this.props;
    const {
      snackbar: { open, errorMessageToDisplay },
    } = this.state;

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
            open={open}
            onClose={this.handleRequestCloseSnackbar}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}>
            <MessageBarContent variant="error" message={errorMessageToDisplay} onClose={this.handleRequestCloseSnackbar} />
          </Snackbar>
        </div>
      </Router>
    );
  };
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  personApiFailedOperations: state.personApi.get('failedOperations'),
});

const mapDispatchToProps = dispatch => ({
  personApiActions: bindActionCreators(personApiActions, dispatch),
});

export default withRoot(
  withStyles(Styles)(
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(App),
  ),
);
