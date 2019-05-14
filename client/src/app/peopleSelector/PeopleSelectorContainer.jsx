import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import PeopleSelector from './PeopleSelector';
import { PersonResultContainer } from '../personResult';
import * as personApiActions from '../../api/person/Actions';
import * as localStateActions from '../../framework/localState/Actions';

class PeopleSelectorContainer extends Component {
  componentWillMount() {
    const { selectedFilter, localStateActions } = this.props;

    localStateActions.peopleTypeChanged(Map({ peopleType: selectedFilter }));

    this.searchPersons(selectedFilter);
  }

  searchPersons = selectedFilter => {
    const { personApiActions } = this.props;

    if (selectedFilter === 'everybody') {
      personApiActions.searchPersons(Map());
    } else if (selectedFilter === 'male') {
      personApiActions.searchPersons(Map({ criteria: Map({ gender: 'male' }) }));
    } else if (selectedFilter === 'female') {
      personApiActions.searchPersons(Map({ criteria: Map({ gender: 'female' }) }));
    } else if (selectedFilter === 'over30') {
      personApiActions.searchPersons(Map({ criteria: Map({ age_gte: 30 }) }));
    } else if (selectedFilter === 'under30') {
      personApiActions.searchPersons(Map({ criteria: Map({ age_lt: 30 }) }));
    }
  };

  render = () => (
    <div>
      <PeopleSelector />
      <PersonResultContainer />
    </div>
  );
}

PeopleSelectorContainer.propTypes = {
  personApiActions: PropTypes.object.isRequired,
  localStateActions: PropTypes.object.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  personApiActions: bindActionCreators(personApiActions, dispatch),
  localStateActions: bindActionCreators(localStateActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeopleSelectorContainer);
