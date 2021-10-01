import React from 'react'
import styled from 'styled-components'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { red } from '@mui/material/colors'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

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
  },
});

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Cock-A-Doodle-Due</Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  height: 100vh; 
  background-color: gray;
`

export default App;
