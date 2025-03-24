import {createTheme} from '@mui/material';

const components = {
  MuiTextField: {
    styleOverrides: {
      root: {
        ".MuiOutlinedInput-root": {
          borderRadius: "16px !important",
          border: "0px !important"
        },
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: '16px', // Applies 16px borderRadius to all buttons
        boxShadow: "0 !important"
      },
    },
  },
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#76ABAE',
      contrastText: '#EEEEEE',
    },
    secondary: {
      default: "#4d4d4d",
      main: "#4d4d4d",
      contrastText: "#fefefe",
    },
    background: {
      default: '#FEFEFE',
      main: '#FEFEFE',
      dark: '#252525',
      paper: '#f4f4f4',
    },
    text: {
      primary: '#31363F',
      secondary: '#555555', // Add secondary text color
    },
  },
  typography: {
    allVariants: {
      color: '#31363F',
    },
    body1: {
      color: '#31363F',
    },
    body2: {
      color: '#555555',
    },
    // Add more typography variants as needed
  },
  components: {
    ...components,
    root: {
      background: "#fefefe"
    }
  }
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#76ABAE',
      contrastText: '#EEEEEE',
    },
    secondary: {
      main: "#fefefe",
      contrastText: "#4d4d4d",
    },
    background: {
      default: '#222831',
      main: '#222831',
      dark: "#fefefe",
      paper: '#31363F',
    },
    text: {
      primary: '#EEEEEE',
      secondary: '#BBBBBB', // Add secondary text color
    },
  },
  typography: {
    allVariants: {
      color: '#EEEEEE',
    },
    body1: {
      color: '#EEEEEE',
    },
    body2: {
      color: '#BBBBBB',
    },
    // Add more typography variants as needed
  },
  components: {
    ...components,
    root: {
      background: "#242424"
    }
  }
});
