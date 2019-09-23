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
    h1: {
      fontSize: '28px',
      fontWeight: 700,
      lineHeight: 1.5
    },
    h2: {
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: 1
    },
    h3: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '16px',
      lineHeight: 1.5
    },
    body2: {
      fontSize: '12px'
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
    MuiButton: {
      root: {
        border: '1px solid #d1d1d1',
        backgroundColor: '#fff',
        borderRadius: '25px',
        fontWeight: 600,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
      },
      text: {
        padding: '12px 57px'
      },
      textPrimary: {
        '&:hover': {
          border: '0.0625rem solid #659db9',
          color: 'white',
          backgroundColor: '#659db9',
          fontWeight: 'bold'
        }
      },
      textSecondary: {
        '&:hover': {
          color: 'yellow',
          fontWeight: 'bold'
        }
      }
    },
    MuiTypography: {
      root: {
        height: 'fit-content'
      }
    },
    MuiDivider: {
      root: {
<<<<<<< HEAD
        padding: '1rem',
=======
        width: '100%'
      }
    },
    MuiFormLabel: {
      root: {
        color: 'black',
        marginBottom: '10px'
      }
    },
    MuiTextField: {
      root: {
        padding: '16px',
>>>>>>> Promise page
        overflow: 'hidden',
        border: '1px solid #d1d1d1',
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
        paddingRight: '10px'
      },
      select: {
        borderRadius: '20px',
        border: '1px solid #d1d1d1',
        '&:focus': {
          border: '1px solid #d1d1d1',
          borderRadius: '20px',
          backgroundColor: 'white'
        },
        '&:hover': {
          boxShadow: '0 2px 4px 0 rgba(0,0,0,.16)'
        }
      },
      selectMenu: {
        height: '40px'
      },
      icon: {
        marginRight: '10px'
      }
    }
  }
});

export default Theme;
