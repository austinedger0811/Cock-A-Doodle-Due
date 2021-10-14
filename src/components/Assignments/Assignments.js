import React, { useState, useEffect } from 'react'
import axios from 'axios'

import ActiveAssignments from './ActiveAssignments'
import CompletedAssignments from './CompletedAssignments'


import Box from '@mui/material/Box'


const Assignments = () => {

const [assignments, setAssignments] = useState([])

  useEffect(() => {
    axios.get('/assignments').then((response) => {
      setAssignments(response.data)
    }).catch(error => console.log(error))
  }, [])

  const handleAssignmentChange = (data) => {
    setAssignments(data)
  }

  return (
    <Box>
      <ActiveAssignments
        assignments={assignments.filter(assignment => !assignment.complete)}
        onAssignmentChange={handleAssignmentChange}
      />
      <CompletedAssignments
        assignments={assignments.filter(assignment => assignment.complete)}
        onAssignmentChange={handleAssignmentChange}
      />
    </Box>
  )
}

export default Assignments
