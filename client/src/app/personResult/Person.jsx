import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import { PersonPropType } from './PropTypes';

const Person = ({ onClick, isSelected, person: { _id, name, age, gender } }) => (
  <TableRow hover onClick={event => onClick(event, _id)} role="checkbox" aria-checked={isSelected} tabIndex={-1} key={_id} selected={isSelected}>
    <TableCell padding="checkbox">
      <Checkbox checked={isSelected} />
    </TableCell>
    <TableCell component="th" scope="row" padding="none">
      {name}
    </TableCell>
    <TableCell align="right">{gender}</TableCell>
    <TableCell align="right">{age}</TableCell>
  </TableRow>
);

Person.propTypes = {
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  person: PersonPropType.isRequired,
};

export default Person;
