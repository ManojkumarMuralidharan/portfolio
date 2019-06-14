import { createMuiTheme } from '@material-ui/core/styles';
import { white } from '@material-ui/core/colors';

const breakpointValues = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};
// Create a theme instance.
const muiTheme = createMuiTheme({
  breakpoints: {
    values: breakpointValues,
  },
  palette: {
    primary: white,
    secondary: white,
    accent: white,
    type: 'light',
  },
  MuiWithWidth: {
    // Initial width property
    initialWidth: 'xl', // Breakpoint being globally set 🌎!
  },
});

export default muiTheme;
