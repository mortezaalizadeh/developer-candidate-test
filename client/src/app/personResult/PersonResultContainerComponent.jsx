import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import PersonResult from './PersonResult';
import { PersonsPropType } from './PropTypes';

class PersonResultContainerComponent extends Component {
  state = {
    selected: [],
  };

  desc = (a, b, sortColumn) => {
    if (b[sortColumn] < a[sortColumn]) {
      return -1;
    }

    if (b[sortColumn] > a[sortColumn]) {
      return 1;
    }

    return 0;
  };

  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
      const sortOrder = cmp(a[0], b[0]);

      if (sortOrder !== 0) {
        return sortOrder;
      }

      return a[1] - b[1];
    });

    return stabilizedThis.map(el => el[0]);
  };

  getSorting = (sortOrder, sortColumn) => (sortOrder === 'desc' ? (a, b) => this.desc(a, b, sortColumn) : (a, b) => -this.desc(a, b, sortColumn));

  handleRequestSort = (event, newSortColumn) => {
    const { sortOrder, sortColumn } = this.props;
    const { localStateActions } = this.props;
    let newSortOrder = 'desc';

    if (sortColumn === sortColumn && sortOrder === 'desc') {
      newSortOrder = 'asc';
    }

    localStateActions.sortColumnChanged(Map({ column: newSortColumn }));
    localStateActions.sortOrderChanged(Map({ order: newSortOrder }));
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
    const { localStateActions } = this.props;

    localStateActions.rowsPerPageChanged(Map({ rowsPerPage: event.target.value }));
  };

  isSelected = id => {
    const { state } = this;

    return state.selected.indexOf(id) !== -1;
  };

  handleDeleteButtonClicked = () => {
    const { personApiActions } = this.props;
    const { selected } = this.state;

    selected.forEach(id => personApiActions.deletePerson(Map({ id })));
    this.setState({ selected: [] });
  };

  render = () => {
    const { selected } = this.state;
    const { unorderedPersons, page, rowsPerPage, sortOrder, sortColumn } = this.props;
    const persons = this.stableSort(unorderedPersons, this.getSorting(sortOrder, sortColumn)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, unorderedPersons.length - page * rowsPerPage);

    return (
      <PersonResult
        sortOrder={sortOrder}
        sortColumn={sortColumn}
        page={page}
        rowsPerPage={rowsPerPage}
        totalPersonCount={unorderedPersons.length}
        persons={persons}
        emptyRows={emptyRows}
        isSelected={this.isSelected}
        numSelected={selected.length}
        onRequestSort={this.handleRequestSort}
        onClick={this.handleClick}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
        onDeleteButtonClicked={this.handleDeleteButtonClicked} />
    );
  };
}

PersonResultContainerComponent.propTypes = {
  personApiActions: PropTypes.object.isRequired,
  localStateActions: PropTypes.object.isRequired,
  unorderedPersons: PersonsPropType.isRequired,
  sortOrder: PropTypes.string.isRequired,
  sortColumn: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default PersonResultContainerComponent;
