import { createMuiTheme } from '@material-ui/core';

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000'
    },
    secondary: {
      main: '#fff'
    },
    action: {
      hover: '#659db9'
    }
  },
  typography: {},
  props: {
    MuiLink: {
      color: 'primary',
      underline: 'none'
    }
  },
  overrides: {
    MuiLink: {
      root: {
        fontWeight: 'bold',
        '&:hover': {
          color: '#659db9',
          fontWeight: 'bold'
        }
      }
    }
  }
});

export default Theme;
