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
import { PersonsPropType } from './PropTypes';

const PersonResult = ({
  classes,
  persons,
  order,
  orderBy,
  selected,
  rowsPerPage,
  page,
  onSelectAllClick,
  onRequestSort,
  onClick,
  isSelected,
  onChangePage,
  onChangeRowsPerPage,
  emptyRows,
}) => {
  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          <PersonResultTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={onSelectAllClick}
            onRequestSort={onRequestSort}
            rowCount={persons.length} />
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
        count={persons.length}
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
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  persons: PersonsPropType.isRequired,
  selected: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  emptyRows: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
};

export default withStyles(Styles)(PersonResult);
