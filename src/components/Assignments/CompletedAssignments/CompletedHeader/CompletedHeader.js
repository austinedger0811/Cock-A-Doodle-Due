import React from 'react'
import axios from 'axios'

import { useAuth } from '../../../../contexts/AuthContext'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

const CompletedHeader = ({ assignments, onAssignmentChange }) => {

  const { currentUser } = useAuth()

  const count = assignments.length
  const hours = Math.round(assignments.reduce((sum, assignment) => sum + assignment.estimate, 0) * 10) / 10

  const handleClearAll = () => {
    if (currentUser) {
      currentUser.getIdToken().then(function(idToken) {
        axios.delete('/delete-completed-assignments', {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        })
        .then(response => onAssignmentChange(response.data))
        .catch(error => console.log(error))
      })

    }
  }

  return (
    <Box mt={6} mb={2} display="flex" justifyContent="space-between">
      <Box>
        <Typography variant='h5'>Completed</Typography> 
        <Typography variant='subtitle2' color="textSecondary">{`${count} ${count > 1 ? "assignments" : "assignment"}, ${hours} ${hours > 1 ? "hours" : "hour"}`}</Typography>
      </Box>
      <Box mt={1}>
        <Button variant="outlined" onClick={handleClearAll}>Clear All</Button>
      </Box>
    </Box> 
  )
}

export default CompletedHeader
