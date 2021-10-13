import React from 'react'

import ActiveHeader from './ActiveHeader/ActiveHeader'
import Assignment from '../Assignment/Assignment'

import Box from '@mui/material/Box'

const ActiveAssignments = ({ assignments, onAssignmentChange }) => {

  return (
    <Box>
      <ActiveHeader
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

export default ActiveAssignments
