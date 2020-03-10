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
    primary: { main: '#0067a3', light: '#99c3db', dark: '#5c9dc5' },
    secondary: { main: '#fff', dark: '#2c2c2a', grey: '#e2e2e2' },
    highlight: { main: '#ee4538' }
  },
  typography: {
    fontFamily: FONT_FAMILY_TEXT,
    fontHeading: FONT_FAMILY_HEADING,
    h4: {
      fontFamily: FONT_FAMILY_HEADING,
      color: '#000'
    },
    h6: {
      fontFamily: FONT_FAMILY_HEADING,
      fontSize: '1.5rem',
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 'normal',
      textTransform: 'capitalize',
      color: '#2c2c2a'
    },
    body2: {
      fontFamily: FONT_FAMILY_TEXT,
      fontSize: '13px',
      color: 'rgb(69, 90, 100)'
    },
    subtitle2: {
      color: 'rgb(69, 90, 100)'
    }
  }
});

export default theme;
