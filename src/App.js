import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import ThemeProvider from '@mui/material/styles/ThemeProvider'

import Section from './components/Section/Section'
import Assignment from './components/Assignment/Assignment'
import Todos from './components/Todos/Todos'
import theme from './assets/theme'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const App = () => {

  const baseURL = 'http://localhost:5000/api/v1'

  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    axios.get(`${baseURL}/assignments`).then((response) => {
      setAssignments(response.data)
    }).catch(error => console.log(error))
  }, [])

  const handleAssignmentChange = (data) => {
    setAssignments(data)
  }

  const getActiveCount = () => {
    return (assignments.filter(assignment => !assignment.complete).length)
  }

  const getCompletedCount = () => {
    return (assignments.filter(assignment => assignment.complete).length)
  }

  const getActiveHours = () => {
    return Math.round(assignments.filter(assignment => !assignment.complete).reduce((sum, assignment) => sum + assignment.time_remaining, 0) * 10) / 10
  }

  const getCompletedHours = () => {
    return Math.round(assignments.filter(assignment => assignment.complete).reduce((sum, assignment) => sum + assignment.estimate, 0) * 10) / 10
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Cock-A-Doodle-Due</Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Box mx={4}>
          <Grid container spacing={6}>
            <Grid item xs={8}>
              <Section
                type='Active'
                count={getActiveCount()}
                hours={getActiveHours()}
                onAssignmentChange={handleAssignmentChange}
              />
              {assignments.filter(assignment => !assignment.complete).map((assignment) => {
                return (
                  <Assignment
                    key={assignment.id}
                    id={assignment.id}
                    name={assignment.name}
                    date={assignment.date}
                    timestamp={assignment.timestamp}
                    progress={assignment.progress}
                    description={assignment.description}
                    estimate={assignment.estimate}
                    timeCompleted={assignment.time_completed}
                    timeRemaining={assignment.time_remaining}
                    complete={assignment.complete}
                    onAssignmentChange={handleAssignmentChange}
                  />
                )
              })}
              <Section
                type='Completed'
                count={getCompletedCount()}
                hours={getCompletedHours()}
              />
              {assignments.filter(assignment => assignment.complete).map((assignment) => {
                return (
                  <Assignment
                    key={assignment.id}
                    id={assignment.id}
                    name={assignment.name}
                    date={assignment.date}
                    timestamp={assignment.timestamp}
                    progress={assignment.progress}
                    description={assignment.description}
                    estimate={assignment.estimate}
                    timeCompleted={assignment.time_completed}
                    timeRemaining={assignment.time_remaining}
                    complete={assignment.complete}
                    onAssignmentChange={handleAssignmentChange}
                  />
                )
              })}
            </Grid>
            <Grid item xs={4}>
              <Todos/>
            </Grid>
          </Grid>
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
