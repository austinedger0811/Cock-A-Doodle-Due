import createTheme from '@mui/material/styles/createTheme'

const theme = createTheme({
  palette: {
    primary: {
      light: '#ff6659',
      main: '#d32f2f',
      dark: '#9a0007',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#ff44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  }
})

export default theme