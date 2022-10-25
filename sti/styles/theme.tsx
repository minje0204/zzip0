// @ts-nocheck
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#F2F2F2',
      main: '#D9D9D9',
      dark: '#616161'
    },
    secondary: {
      main: '#E39685'
    },
    navbar: {
      main: '#F8F8F8',
      contrastText: '#222222'
    }
  }
});

declare module '@mui/material/styles' {
  interface Palette {
    navbar: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    navbar?: PaletteOptions['primary'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    navbar: true;
  }
}

export default theme;
