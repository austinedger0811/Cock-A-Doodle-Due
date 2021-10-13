import React from 'react'
import axios from 'axios'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import CssBaseline from "@mui/material/CssBaseline"

import NavBar from '../NavBar/NavBar'
import Assignments from '../Assignments/Assignments'
import Todos from '../Todos/Todos'
import theme from '../../assets/theme/theme'

import Grid from '@mui/material/Grid'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Grid container spacing={4} mx={4}>
        <Grid item xs={8}>
          <Assignments /> 
        </Grid>
        <Grid item xs={4}>
          <Todos />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App;
