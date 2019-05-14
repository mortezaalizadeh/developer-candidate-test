import React from 'react';
import { connect } from 'react-redux';
import { PeopleSelectorContainer } from '../peopleSelector';

const FemaleSelectorContainer = () => <PeopleSelectorContainer selectedFilter="female" />;

FemaleSelectorContainer.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FemaleSelectorContainer);
