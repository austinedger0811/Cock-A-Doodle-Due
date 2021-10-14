import React from 'react'

import NavBar from '../NavBar'
import Assignments from '../Assignments'
import Reminders from '../Reminders'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

const App = () => {

  return (
    <React.Fragment>
      <NavBar />
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Assignments /> 
          </Grid>
          <Grid item xs={4}>
            <Reminders />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default App;
