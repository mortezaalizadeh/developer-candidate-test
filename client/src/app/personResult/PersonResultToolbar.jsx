import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { withTranslation } from 'react-i18next';
import Styles from './Styles';

const PersonResultToolbar = ({ classes, numSelected, onDeleteButtonClicked, t }) => (
  <Toolbar
    className={classNames(classes.toolbarRoot, {
      [classes.toolbarHighlight]: numSelected > 0,
    })}>
    <div className={classes.toolbarTitle}>
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1">
          {numSelected + ' ' + t('selected.label')}
        </Typography>
      ) : (
        <Typography variant="h6" id="tableTitle">
          {t('selectPersonToRemoveMessage')}
        </Typography>
      )}
    </div>
    <div className={classes.toolbarSpacer} />
    <div className={classes.toolbarActions}>
      {numSelected > 0 && (
        <Tooltip title={t('delete.button.caption')}>
          <IconButton aria-label="Delete" onClick={onDeleteButtonClicked}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </div>
  </Toolbar>
);

PersonResultToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  numSelected: PropTypes.number.isRequired,
  onDeleteButtonClicked: PropTypes.func.isRequired,
};

export default withStyles(Styles)(withTranslation()(PersonResultToolbar));
