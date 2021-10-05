import createTheme from '@mui/material/styles/createTheme'
import { green, red, yellow } from '@mui/material/colors'

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
    ahead: {
      light: '#6fbf73',
      main: '#4caf50',
      dark: '#357a38',
    },
    ontime: {
      light: '#ffef62',
      main: '#ffeb3b',
      dark: '#b2a429',
    },
    behind: {
      light: '#ff6659',
      main: '#d32f2f',
      dark: '#9a0007',
    }
  }
})

export default theme