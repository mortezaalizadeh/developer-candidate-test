import React from 'react';
import { connect } from 'react-redux';
import { PeopleSelectorContainer } from '../peopleSelector';

const Under30SelectorContainer = () => <PeopleSelectorContainer selectedFilter="under30" />;

Under30SelectorContainer.propTypes = {};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Under30SelectorContainer);
