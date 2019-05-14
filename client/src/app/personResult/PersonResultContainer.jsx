import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import PersonResult from './PersonResult';
import { PersonsPropType } from './PropTypes';
import * as localStateActions from '../../framework/localState/Actions';

const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);

    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });

  return stabilizedThis.map(el => el[0]);
};

const getSorting = (order, orderBy) => (order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy));

class PersonResultContainer extends Component {
  state = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    rowsPerPage: 5,
  };

  handleRequestSort = (event, property) => {
    const { state } = this;
    let order = 'desc';

    if (state.orderBy === property && state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy: property });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, pageNumber) => {
    const { localStateActions } = this.props;

    localStateActions.pageNumberChanged(Map({ pageNumber }));
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => {
    const { state } = this;

    state.selected.indexOf(id) !== -1;
  };

  render = () => {
    const { unorderedPersons, page } = this.props;
    const { order, orderBy, rowsPerPage } = this.state;
    const persons = stableSort(unorderedPersons, getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, unorderedPersons.length - page * rowsPerPage);

    return (
      <PersonResult
        order={order}
        orderBy={orderBy}
        page={page}
        rowsPerPage={rowsPerPage}
        toatlPersonCount={unorderedPersons.length}
        persons={persons}
        emptyRows={emptyRows}
        onRequestSort={this.handleRequestSort}
        onClick={this.handleClick}
        isSelected={this.isSelected}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage} />
    );
  };
}

PersonResultContainer.propTypes = {
  localStateActions: PropTypes.object.isRequired,
  unorderedPersons: PersonsPropType.isRequired,
  page: PropTypes.number.isRequired,
};

const mapStateToProps = state => {
  return {
    unorderedPersons: state.personApi.get('persons').toJS(),
    page: state.localState.get('pageNumber'),
  };
};

const mapDispatchToProps = dispatch => ({
  localStateActions: bindActionCreators(localStateActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonResultContainer);
