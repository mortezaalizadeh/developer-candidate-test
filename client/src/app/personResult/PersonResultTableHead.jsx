import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import { withTranslation } from 'react-i18next';

class PersonResultTableHead extends Component {
  constructor(props, context) {
    super(props, context);

    const { t } = this.props;

    this.state = {
      columns: [
        { id: 'name', numeric: false, disablePadding: true, label: t('columns.name') },
        { id: 'gender', numeric: true, disablePadding: false, label: t('columns.gender') },
        { id: 'age', numeric: true, disablePadding: false, label: t('columns.age') },
      ],
    };
  }
  createSortHandler = property => event => {
    const { onRequestSort } = this.props;

    onRequestSort(event, property);
  };

  render = () => {
    const { sortOrder, sortColumn } = this.props;
    const { columns } = this.state;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox" />
          {columns.map(
            column => (
              <TableCell
                key={column.id}
                align={column.numeric ? 'right' : 'left'}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={sortColumn === column.id ? sortOrder : false}>
                <Tooltip title="Sort" placement={column.numeric ? 'bottom-end' : 'bottom-start'} enterDelay={300}>
                  <TableSortLabel active={sortColumn === column.id} direction={sortOrder} onClick={this.createSortHandler(column.id)}>
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
  onRequestSort: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  sortColumn: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(PersonResultTableHead);
