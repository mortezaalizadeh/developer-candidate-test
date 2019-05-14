import React, { Component } from 'react';
import PersonResult from './PersonResult';

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
    unorderedPersons: [
      { name: 'Morteza 1', age: 37, gender: 'male' },
      { name: 'Morteza 2', age: 38, gender: 'male' },
      { name: 'Morteza 3', age: 39, gender: 'male' },
      { name: 'Morteza 4', age: 20, gender: 'female' },
      { name: 'Morteza 5', age: 21, gender: 'female' },
      { name: 'Morteza 6', age: 22, gender: 'female' },
      { name: 'Morteza 7', age: 65, gender: 'male' },
      { name: 'Morteza 8', age: 98, gender: 'male' },
      { name: 'Morteza 9', age: 12, gender: 'male' },
    ],
    page: 0,
    rowsPerPage: 5,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    const { state } = this;

    if (state.orderBy === property && state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));

      return;
    }

    this.setState({ selected: [] });
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

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => {
    const { state } = this;

    state.selected.indexOf(id) !== -1;
  };

  render = () => {
    const { order, orderBy, selected, rowsPerPage, page, unorderedPersons } = this.state;
    const persons = stableSort(unorderedPersons, getSorting(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, persons.length - page * rowsPerPage);

    return (
      <PersonResult
        order={order}
        orderBy={orderBy}
        selected={selected}
        page={page}
        rowsPerPage={rowsPerPage}
        persons={persons}
        emptyRows={emptyRows}
        onSelectAllClick={this.handleSelectAllClick}
        onRequestSort={this.handleRequestSort}
        onClick={this.handleClick}
        isSelected={this.isSelected}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage} />
    );
  };
}

export default PersonResultContainer;
