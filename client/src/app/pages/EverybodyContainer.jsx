import React from 'react';
import { connect } from 'react-redux';
import { PeopleSelectorContainer } from '../peopleSelector';

const EverybodySelectorContainer = () => <PeopleSelectorContainer selectedFilter="everybody" />;

EverybodySelectorContainer.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EverybodySelectorContainer);
