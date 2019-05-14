import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withTranslation } from 'react-i18next';
import Styles from './Styles';

const PeopleSelector = ({ classes, t, selectedFilter, onSelectorSelected }) => {
  return (
    <Paper className={classes.root}>
      <Typography>
        <Button onClick={() => onSelectorSelected('everybody')} color={selectedFilter === 'everybody' ? 'primary' : 'default'}>
          {t('everybody.label')}
        </Button>
        <Button onClick={() => onSelectorSelected('male')} color={selectedFilter === 'male' ? 'primary' : 'default'}>
          {t('male.label')}
        </Button>
        <Button onClick={() => onSelectorSelected('female')} color={selectedFilter === 'female' ? 'primary' : 'default'}>
          {t('female.label')}
        </Button>
        <Button onClick={() => onSelectorSelected('over30')} color={selectedFilter === 'over30' ? 'primary' : 'default'}>
          {t('over30.label')}
        </Button>
        <Button onClick={() => onSelectorSelected('under30')} color={selectedFilter === 'under30' ? 'primary' : 'default'}>
          {t('under30.label')}
        </Button>
      </Typography>
    </Paper>
  );
};

PeopleSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  onSelectorSelected: PropTypes.func.isRequired,
};

export default withStyles(Styles)(withTranslation()(PeopleSelector));
