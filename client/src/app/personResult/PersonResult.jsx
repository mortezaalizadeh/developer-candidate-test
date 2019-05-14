import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Person from './Person';
import PersonResultTableHead from './PersonResultTableHead';
import EmptyPersonRow from './EmptyPersonRow';
import Styles from './Styles';
import PersonResultToolbar from './PersonResultToolbar';
import { PersonsPropType } from './PropTypes';

const PersonResult = ({
  classes,
  toatlPersonCount,
  persons,
  sortOrder,
  sortColumn,
  rowsPerPage,
  page,
  onRequestSort,
  onClick,
  isSelected,
  onChangePage,
  onChangeRowsPerPage,
  emptyRows,
  numSelected,
  onDeleteButtonClicked,
}) => {
  return (
    <Paper className={classes.root}>
      <PersonResultToolbar numSelected={numSelected} onDeleteButtonClicked={onDeleteButtonClicked} />
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          <PersonResultTableHead sortOrder={sortOrder} sortColumn={sortColumn} onRequestSort={onRequestSort} />
          <TableBody>
            {persons.map(person => (
              <Person key={person._id} onClick={onClick} person={person} isSelected={isSelected(person._id)} />
            ))}
            {emptyRows > 0 && <EmptyPersonRow emptyRows={emptyRows} />}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={toatlPersonCount}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage} />
    </Paper>
  );
};

PersonResult.propTypes = {
  classes: PropTypes.object.isRequired,
  sortOrder: PropTypes.string.isRequired,
  sortColumn: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  toatlPersonCount: PropTypes.number.isRequired,
  persons: PersonsPropType.isRequired,
  emptyRows: PropTypes.number.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
  onDeleteButtonClicked: PropTypes.func.isRequired,
};

export default withStyles(Styles)(PersonResult);
