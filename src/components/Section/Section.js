import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const Section = ({ type, count, hours }) => {
  return (
    <Box mt={6} mb={2}>
      <Typography variant='h5'>{type}</Typography> 
      <Typography variant='body2'>{count} assignments, {hours} hours</Typography> 
    </Box>
  )
}

export default Section 
