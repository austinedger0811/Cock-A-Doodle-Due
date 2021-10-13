import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const CompletedHeader = ({ assignments, onAssignmentChange }) => {

  const count = assignments.length
  const hours = Math.round(assignments.reduce((sum, assignment) => sum + assignment.estimate, 0) * 10) / 10

  return (
    <Box mt={6} mb={2}>
      <Typography variant='h5'>Completed</Typography> 
      <Typography variant='body2'>{`${count} ${count > 1 ? "assignments" : "assignment"}, ${hours} ${hours > 1 ? "hours" : "hour"}`}</Typography>
    </Box> 
  )
}

export default CompletedHeader
