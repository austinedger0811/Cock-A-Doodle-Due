import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Section from './components/Section/Section'
import Assignment from './components/Assignment/Assignment'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

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

const App = () => {

  const [assignments, setAssignments] = useState([])

  const baseURL = 'http://localhost:5000/api/v1'

  useEffect(() => {
    axios.get(`${baseURL}/assignments`).then((response) => {
      setAssignments(response.data)
    })
  }, [assignments])

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Cock-A-Doodle-Due</Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Box mx={10}>
          <Section type='Active' count={assignments.filter(assignment => !assignment.complete).length} hours={assignments.filter(assignment => !assignment.complete).reduce((sum, assignment) => sum + assignment.estimate, 0)} />
          {assignments.filter(assignment => !assignment.complete).map((assignment, index) => {
            return <Assignment key={index} name={assignment.name} date={assignment.date} progress={assignment.progress} />
          })}
          <Section type='Completed' count={assignments.filter(assignment => assignment.complete).length} hours={assignments.filter(assignment => assignment.complete).reduce((sum, assignment) => sum + assignment.estimate, 0)} />
          {assignments.filter(assignment => assignment.complete).map((assignment, index) => {
            return <Assignment key={index} name={assignment.name} date={assignment.date} progress={assignment.progress} />
          })}
        </Box>
      </Container>
    </ThemeProvider>
  )
}

const Container = styled(Box)`
  height: 100vh; 
  background-color: #f6f6f6;
`

export default App;
