import React from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

const Assignment = ( {name, date, progress} ) => {
  return (
    <Box mb={2}>
      <Card>
        <CardActionArea>
          <CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              <Typography variant="h6"> {name} </Typography>
              <Typography variant="caption"> {date} </Typography>
            </Box>
            <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center'}}>
              <CircularProgress variant="determinate" value={progress}/>
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" component="div" color="text.secondary">
                  {`${Math.round(progress)}%`}
                </Typography>
              </Box>
            </Box>

          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  )
}

export default Assignment
