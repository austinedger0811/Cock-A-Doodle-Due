import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import CssBaseline from "@mui/material/CssBaseline"

import NavBar from './components/NavBar/NavBar'
import Section from './components/Section/Section'
import Assignment from './components/Assignment/Assignment'
import Todos from './components/Todos/Todos'
import theme from './assets/theme'

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
      <CssBaseline />
      <NavBar />
      <Box mx={4}>
        <Grid container spacing={4}>
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
    </ThemeProvider>
  )
}

export default App;
