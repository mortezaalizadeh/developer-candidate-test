import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

const columns = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
  { id: 'gender', numeric: true, disablePadding: false, label: 'Gender' },
];

class PersonResultTableHead extends Component {
  createSortHandler = property => event => {
    const { onRequestSort } = this.props;

    onRequestSort(event, property);
  };

  render = () => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox indeterminate={numSelected > 0 && numSelected < rowCount} checked={numSelected === rowCount} onChange={onSelectAllClick} />
          </TableCell>
          {columns.map(
            column => (
              <TableCell
                key={column.id}
                align={column.numeric ? 'right' : 'left'}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}>
                <Tooltip title="Sort" placement={column.numeric ? 'bottom-end' : 'bottom-start'} enterDelay={300}>
                  <TableSortLabel active={orderBy === column.id} direction={order} onClick={this.createSortHandler(column.id)}>
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  };
}

PersonResultTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default PersonResultTableHead;
