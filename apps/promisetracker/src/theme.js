import createTheme from '@codeforafrica/hurumap-ui/core/styles/createTheme';

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
  }
});

export default theme;
