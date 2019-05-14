import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import Styles from './Styles';

const styles = {
  activeLink: {
    color: 'blue',
  },
};

const PeopleSelector = ({ classes }) => {
  const { t } = useTranslation();

  return (
    <Paper className={classes.root}>
      <Typography className={classes.content}>{t('people.label')}</Typography>
      <Typography>
        <NavLink to="/everybody" className={classes.link} activeStyle={styles.activeLink}>
          {t('everybody.label')}
        </NavLink>
        <NavLink to="/male" className={classes.link} activeStyle={styles.activeLink}>
          {t('male.label')}
        </NavLink>
        <NavLink to="/female" className={classes.link} activeStyle={styles.activeLink}>
          {t('female.label')}
        </NavLink>
        <NavLink to="/over30" className={classes.link} activeStyle={styles.activeLink}>
          {t('over30.label')}
        </NavLink>
        <NavLink to="/under30" className={classes.link} activeStyle={styles.activeLink}>
          {t('under30.label')}
        </NavLink>
      </Typography>
    </Paper>
  );
};

PeopleSelector.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(PeopleSelector);
