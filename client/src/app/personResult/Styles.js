import { lighten } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  toolbarRoot: {
    paddingRight: theme.spacing.unit,
  },
  toolbarHighlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  toolbarSpacer: {
    flex: '1 1 100%',
  },
  toolbarActions: {
    color: theme.palette.text.secondary,
  },
  toolbarTitle: {
    flex: '0 0 auto',
  },
});

export default styles;
