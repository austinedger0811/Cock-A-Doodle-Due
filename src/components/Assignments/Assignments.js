import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useAuth } from '../../contexts/AuthContext'
import ActiveAssignments from './ActiveAssignments'
import CompletedAssignments from './CompletedAssignments'


import Box from '@mui/material/Box'


const Assignments = () => {

const [assignments, setAssignments] = useState([])
const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      currentUser.getIdToken().then(function(idToken) {
        axios.get('/assignments', {
          headers: {
            'Authorization': `Bearer ${idToken}`
          }
        })
        .then((response) => {
          setAssignments(response.data)
        }).catch(error => console.log(error)) 
      })
    }
  }, [currentUser])

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
