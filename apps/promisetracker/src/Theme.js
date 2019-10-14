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
    },
    MuiExpansionPanel: {
      elevation: 0,
      TransitionProps: {
        timeout: 0
      }
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '.Mui-share': {
          outline: 'none',
          '& .Mui-desaturated': {
            color: 'grey',
            filter: 'grayscale(1)',
            '&:hover': {
              filter: 'none',
              color: '#659db9'
            }
          }
        }
      }
    },
    MuiExpansionPanel: {
      root: {
        '&.Mui-expanded': {
          margin: 0
        },
        '&:before': {
          content: ''
        }
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        color: '#659db9',
        '&.Mui-expanded': {
          minHeight: '3rem',
          '& > .Mui-icon-expanded': {
            display: 'none'
          },
          '& > .Mui-icon-collapsed': {
            display: 'none'
          }
        },
        padding: 0
      },
      content: {
        '& > .Mui-icon-expand': {
          display: 'block'
        },
        '& > .Mui-icon-collapse': {
          display: 'none'
        },
        '&.Mui-expanded': {
          margin: 0,
          '& > .Mui-icon-collapse': {
            display: 'block'
          },
          '& > .Mui-icon-expand': {
            display: 'none'
          }
        }
      }
    },
    MuiExpansionPanelDetails: {
      root: {
        padding: 0
      }
    },
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
    MuiFormLabel: {
      root: {
        color: 'black',
        marginBottom: '0.625rem'
      }
    },
    MuiTextField: {
      root: {
        padding: '1rem',
        overflow: 'hidden',
        border: '0.0625rem solid #d1d1d1',
        backgroundColor: 'white',
        color: '#637381 !important'
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
        '& .Mui-desaturated': {
          color: 'grey',
          filter: 'grayscale(1)',
          '&:hover': {
            filter: 'none',
            color: '#659db9'
          }
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
