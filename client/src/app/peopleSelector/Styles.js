// @flow

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit,
    overflowX: 'auto',
  },
  content: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 2,
  },
  link: {
    margin: theme.spacing.unit,
  },
});

export default styles;
