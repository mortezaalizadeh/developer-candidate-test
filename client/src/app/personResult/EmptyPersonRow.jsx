import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const EmptyPersonRow = ({ emptyRows }) => (
  <TableRow style={{ height: 49 * emptyRows }}>
    <TableCell colSpan={4} />
  </TableRow>
);

EmptyPersonRow.propTypes = {
  emptyRows: PropTypes.number.isRequired,
};

export default EmptyPersonRow;
