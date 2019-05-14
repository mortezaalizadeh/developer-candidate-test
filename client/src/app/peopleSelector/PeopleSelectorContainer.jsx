import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { withRouter } from 'react-router-dom';
import PeopleSelector from './PeopleSelector';
import { PersonResultContainer } from '../personResult';
import * as personApiActions from '../../api/person/Actions';

class PeopleSelectorContainer extends Component {
  componentWillMount() {
    const { history, personApiActions } = this.props;

    personApiActions.searchPersons(Map());

    this.unlisten = history.listen(() => {
      personApiActions.searchPersons(Map());
    });
  }
  componentWillUnmount() {
    this.unlisten();
  }

  render = () => {
    const { selectedFilter } = this.props;

    return (
      <div>
        <PeopleSelector selectedFilter={selectedFilter} />
        <PersonResultContainer />
      </div>
    );
  };
}

PeopleSelectorContainer.propTypes = {
  personApiActions: PropTypes.object.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  personApiActions: bindActionCreators(personApiActions, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PeopleSelectorContainer),
);
