import React from 'react';
import { connect } from 'react-redux';
import { PeopleSelectorContainer } from '../peopleSelector';

const MaleSelectorContainer = () => <PeopleSelectorContainer selectedFilter="male" />;

MaleSelectorContainer.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MaleSelectorContainer);
