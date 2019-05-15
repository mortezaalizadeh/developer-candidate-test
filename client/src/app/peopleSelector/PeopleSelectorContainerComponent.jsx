import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import PeopleSelector from './PeopleSelector';
import { PersonResultContainer } from '../personResult';

class PeopleSelectorContainerComponent extends Component {
  componentWillMount() {
    const { selectedFilter } = this.props;

    this.searchPersons(selectedFilter);
  }

  searchPersons = selectedFilter => {
    const { personApiActions, localStateActions } = this.props;

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

    localStateActions.pageNumberChanged(Map({ pageNumber: 0 }));
  };

  handleSelectorSelected = selectedFilter => {
    const { history } = this.props;

    if (selectedFilter === 'everybody') {
      history.push('/everybody');
    } else if (selectedFilter === 'male') {
      history.push('/male');
    } else if (selectedFilter === 'female') {
      history.push('/female');
    } else if (selectedFilter === 'over30') {
      history.push('/over30');
    } else if (selectedFilter === 'under30') {
      history.push('/under30');
    }
  };

  render = () => {
    const { selectedFilter } = this.props;

    return (
      <div>
        <PeopleSelector selectedFilter={selectedFilter} onSelectorSelected={this.handleSelectorSelected} />
        <PersonResultContainer />
      </div>
    );
  };
}

PeopleSelectorContainerComponent.propTypes = {
  personApiActions: PropTypes.object.isRequired,
  localStateActions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  selectedFilter: PropTypes.string.isRequired,
};

export default PeopleSelectorContainerComponent;
