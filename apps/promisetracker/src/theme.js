import createTheme from '@codeforafrica/hurumap-ui/core/styles/createTheme';

const FONT_FAMILY_HEADING = '"Lora", "serif"';
const FONT_FAMILY_TEXT = '"Roboto", "sans-serif"';

const COLOR_SCALE = [];

const theme = createTheme({
  chart: {
    colorScale: COLOR_SCALE,
    pie: {
      colorScale: COLOR_SCALE,
      height: 350,
      legendWidth: 150,
      origin: { x: 150, y: 125 },
      padding: 0,
      style: {
        data: {
          fontFamily: FONT_FAMILY_TEXT,
          fontSize: 10
        },
        labels: {
          fontFamily: FONT_FAMILY_TEXT,
          fontSize: 16,
          fill: 'rgb(0,0,0)'
        }
      },
      width: 350
    }
  },
  palette: {
    background: { default: '#fff' },
    primary: { main: '#237bb0', light: '#99c3db', dark: '#5c9dc5' },
    secondary: { main: '#fff', dark: '#2c2c2a', grey: '#e2e2e2' },
    highlight: { main: '#ff2127' }
  },
  typography: {
    fontFamily: FONT_FAMILY_TEXT,
    fontHeading: FONT_FAMILY_HEADING,
    h1: {
      color: '#fff',
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '5rem',
      fontWeight: 400
    },
    h6: {
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '20px',
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      textTransform: 'capitalize',
      color: '#2c2c2a'
    },
    body2: {
      color: 'rgb(0, 0, 0, 0.5)',
      fontFamily: FONT_FAMILY_TEXT
    }
  }
});

export default theme;
