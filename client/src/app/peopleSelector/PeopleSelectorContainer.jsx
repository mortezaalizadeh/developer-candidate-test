import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PeopleSelector from './PeopleSelector';
import { PersonResultContainer } from '../personResult';

class PeopleSelectorContainer extends Component {
  componentWillMount() {
    const { history } = this.props;

    this.unlisten = history.listen(() => {});
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
  selectedFilter: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PeopleSelectorContainer),
);
