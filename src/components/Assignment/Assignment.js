import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import styled from '@mui/material/styles/styled';


import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardActionArea from '@mui/material/CardActionArea'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'
import Collapse from '@mui/material/Collapse'
import Slider from '@mui/material/Slider'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Assignment = ( {id, name, date, progress, description, estimate, timeCompleted, timeRemaining} ) => {

  const baseURL = 'http://localhost:5000/api/v1'

  const [expanded, setExpanded] = useState(false)
  const [update, setUpdate] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(progress)

  const removeAssignment = () => {
    axios.delete(`${baseURL}/delete-assignment/${id}`)
      .then(handleExpandClick)
      .catch(error => console.log(error))
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleUpdateClick = () => {
    setUpdate(!update)
  }

  const handleCancleClick = () => {
    setUpdate(!update)
  }

  const handleSliderChange = (event, newValue) => {
    setCurrentProgress(newValue)
  }

  const handleProgressSave = () => {
    const newProgress = { progress: currentProgress }
    axios.put(`${baseURL}/update-assignment/${id}`, newProgress)
        .then(setUpdate(!update))
        .catch(error => console.log(error))
  }

  return (
    <Box mb={2}>
      <Card>
        <CardActionArea onClick={handleExpandClick} disabled={expanded}>
          <LinearProgress variant="determinate" value={currentProgress} />
          <CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              <Typography variant="h6"> {name} </Typography>
              <Typography variant="caption"> {moment(date).format('ddd MMM Do, h:mm a')} </Typography>
            </Box>
            <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center'}}>
              <CircularProgress variant="determinate" value={currentProgress}/>
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
                  {`${Math.round(currentProgress)}%`}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </CardActionArea>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Stack spacing={3}>
              <Box>
                <Typography variant="body1">Description</Typography>
                <Typography variant="body2">{description}</Typography>
              </Box>
              <Box>
                <Typography variant="body1">Time</Typography>
                <Typography variant="body2">Estimate: {estimate} {estimate > 1 ? "hours" : "hour"}</Typography>
                <Typography variant="body2">Completed: {timeCompleted} {timeCompleted > 1 ? "hours" : "hour"}</Typography>
                <Typography variant="body2">Remaining: {timeRemaining} {timeRemaining > 1 ? "hours" : "hour"}</Typography>
              </Box>
              <Box>
                <Typography variant="body1">Progress</Typography>
                <Slider key={id} defaultValue={currentProgress} aria-label="Default" valueLabelDisplay="auto" disabled={!update} onChange={handleSliderChange}/>
              </Box>
            </Stack>
          </CardContent>
        </Collapse>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardActions disableSpacing>
            { update ? <Button size="small" onClick={handleProgressSave}>Save</Button> : null }
            { update ? <Button size="small" onClick={handleCancleClick}>Cancle</Button> : null }
            { !update ? <Button size="small" onClick={handleUpdateClick}>Update</Button> : null }
            { !update ? <Button size="small" onClick={removeAssignment}>Remove</Button> : null }
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>  
        </Collapse>
      </Card>
    </Box>
  )
}

export default Assignment
