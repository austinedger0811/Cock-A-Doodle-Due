import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

import Section from './components/Section/Section'
import Assignment from './components/Assignment/Assignment'
import theme from './assets/theme'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const App = () => {

  const [assignments, setAssignments] = useState([])

  const baseURL = 'http://localhost:5000/api/v1'

  useEffect(() => {
    axios.get(`${baseURL}/assignments`).then((response) => {
      setAssignments(response.data)
    }).catch(error => console.log(error))
  }, [])

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
            return <Assignment key={index} id={assignment.id} name={assignment.name} date={assignment.date} progress={assignment.progress} description={assignment.description} estimate={assignment.estimate}/>
          })}
          <Section type='Completed' count={assignments.filter(assignment => assignment.complete).length} hours={assignments.filter(assignment => assignment.complete).reduce((sum, assignment) => sum + assignment.estimate, 0)} />
          {assignments.filter(assignment => assignment.complete).map((assignment, index) => {
            return <Assignment key={index} name={assignment.name} date={assignment.date} progress={assignment.progress} description={assignment.description} estimate={assignment.estimate}/>
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
