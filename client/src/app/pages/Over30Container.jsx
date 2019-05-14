import React from 'react';
import { connect } from 'react-redux';
import { PeopleSelectorContainer } from '../peopleSelector';

const Over30SelectorContainer = () => <PeopleSelectorContainer selectedFilter="over30" />;

Over30SelectorContainer.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Over30SelectorContainer);
