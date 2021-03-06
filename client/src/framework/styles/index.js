import { create, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default';
import { createMuiTheme, createGenerateClassName } from '@material-ui/core';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
  },
});

// Configure JSS
const jss = create(preset());

export const sheetsManager = new Map();

const createContext = () => ({
  jss,
  theme,
  // This is needed in order to deduplicate the injection of CSS in the page.
  sheetsManager,
  // This is needed in order to inject the critical CSS.
  sheetsRegistry: new SheetsRegistry(),
  generateClassName: createGenerateClassName(),
});

export default createContext;
