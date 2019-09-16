import { createMuiTheme } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';

const Theme = createMuiTheme({
  palette: {
    background: {
      default: '#fff'
    },
    primary: {
      main: '#000'
    },
    secondary: {
      main: '#fff'
    },
    action: {
      active: '#659db9',
      hover: '#000'
    }
  },
  typography: {
    h2: {
      fontSize: '1.25rem',
      fontWeight: 700,
      lineHeight: 1
    },
    h3: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.75rem'
    }
  },
  props: {
    MuiLink: {
      color: 'primary',
      underline: 'none'
    },
    MuiButtonBase: {
      disableRipple: true,
      disableTouchRipple: true
    },
    MuiIconButton: {
      disableRipple: true,
      disableTouchRipple: true,
      disableFocusRipple: true
    },
    MuiSelect: {
      disableUnderline: true,
      IconComponent: KeyboardArrowDown
    },
    MuiInput: {
      disableUnderline: true
    }
  },
  overrides: {
    MuiTypography: {
      root: {
        height: 'fit-content'
      }
    },
    MuiDivider: {
      root: {
        width: '100%'
      }
    },
    MuiListItem: {
      button: {
        '&:hover': {
          color: '#659db9',
          backgroundColor: 'white'
        }
      }
    },
    MuiLink: {
      root: {
        fontWeight: 'bold',
        '&:hover': {
          color: '#659db9',
          fontWeight: 'bold'
        }
      }
    },
    MuiInput: {
      root: {
        width: '100%'
      }
    },
    MuiSelect: {
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        padding: 0,
        paddingRight: '0.625rem'
      },
      select: {
        borderRadius: '1.25rem',
        border: '0.0625rem solid #d1d1d1',
        '&:focus': {
          border: '0.0625rem solid #d1d1d1',
          borderRadius: '1.25rem',
          backgroundColor: 'white'
        },
        '&:hover': {
          boxShadow: '0 0.125rem 0.25rem 0 rgba(0,0,0,.16)'
        }
      },
      selectMenu: {
        height: '2.5rem'
      },
      icon: {
        marginRight: '0.625rem'
      }
    }
  }
});

export default Theme;
