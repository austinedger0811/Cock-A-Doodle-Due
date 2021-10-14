import React from 'react'

import CompletedHeader from './CompletedHeader'
import Assignment from '../Assignment'

import Box from '@mui/material/Box'

const CompletedAssignments = ({ assignments, onAssignmentChange }) => {

  return (
    <Box>
      <CompletedHeader
        assignments={assignments}
        onAssignmentChange={onAssignmentChange}
      />
      {assignments.map((assignment) => {
        return (
          <Assignment
            key={assignment.id}
            assignment={assignment}
            onAssignmentChange={onAssignmentChange}
          />
        )
      })}
    </Box>
  )
}

export default CompletedAssignments
