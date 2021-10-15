import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import styled from '@mui/material/styles/styled'

import ProgressChart from './ProgressChart'
import TimeChart from './TimeChart'

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

const calculateCurrentDate = (timestamp) => {
  var currentDate = moment()
  var hours = currentDate.diff(timestamp, 'hours') 
  return (hours / 24).toFixed(2)
}

const Assignment = ({ assignment, onAssignmentChange }) => {

  const { id, name, date, timestamp, progress, description, data, estimate, time_completed, time_remaining, complete, total_days } = assignment

  const currentDays = calculateCurrentDate(timestamp)

  const [expanded, setExpanded] = useState(false)
  const [update, setUpdate] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(progress)

  const handleSliderChange = (event, newValue) => {
    setCurrentProgress(newValue)
  }

  const afterRemove = (newData) => {
    onAssignmentChange(newData)
    handleExpandClick()
  }

  const afterUpdate = (newData) => {
    onAssignmentChange(newData)
    setUpdate(!update)
  }

  const handleProgressSave = () => {
    const newProgress = { progress: currentProgress }
    axios.put(`/update-assignment/${id}`, newProgress)
        .then(response => afterUpdate(response.data))
        .catch(error => console.log(error))
  }

  const removeAssignment = () => {
    axios.delete(`/delete-assignment/${id}`)
      .then(response => afterRemove(response.data))
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

  const calculatePriority = () => {

    if (complete) {
      return 'ahead'
    }

    var currentDate = moment()
    var startDate = moment(timestamp)
    var dueDate = moment(date) 

    var totalHours = dueDate.diff(startDate, 'hours')
    var passedHours = currentDate.diff(startDate, 'hours')

    var expectedProgress = (passedHours / totalHours) * 100

    var diff = progress - expectedProgress

    if (diff > 10) {
      return 'ahead'
    } else if(diff < -10) {
      return 'behind'
    } else {
      return 'ontime'
    }
  }

  return (
    <Box mb={2}>
      <Card>
        <CardActionArea onClick={handleExpandClick} disabled={expanded}>
          <LinearProgress variant="determinate" value={currentProgress} color={calculatePriority()} />
          <CardContent style={{display: 'flex', justifyContent: 'space-between'}}>
            <Box>
              <Typography variant="h6">{name}</Typography>
              <Typography
                variant="caption"
                color={total_days - currentDays < 1 ? "behind.main" : "textSecondary"}
              >
                {moment(date).format('ddd MMM Do, h:mm a')}
              </Typography>
            </Box>
            <Box sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center'}}>
              <CircularProgress variant="determinate" value={currentProgress} color={calculatePriority()} />
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
            <Stack spacing={6}>
              <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                <Box>
                  <Typography variant="subtitle1">Description</Typography>
                  <Typography variant="body2" color="textSecondary">{description}</Typography>
                </Box>
                <TimeChart
                  estimatedTime={estimate}
                  timeCompleted={time_completed}
                  timeRemaining={time_remaining}
                />
              </Box>
              {/* <Box>
                <Typography variant="subtitle1">Time</Typography>
                <Typography variant="body2">Estimate: {estimate} {estimate > 1 ? "hours" : "hour"}</Typography>
                <Typography variant="body2">Completed: {time_completed} {time_completed > 1 ? "hours" : "hour"}</Typography>
                <Typography variant="body2">Remaining: {time_remaining} {time_remaining > 1 ? "hours" : "hour"}</Typography>
              </Box> */}
              <ProgressChart
                data={data}
                currentDays={currentDays}
                progress={progress}
                totalDays={total_days}
              />
              <Box>
                <Slider key={id} defaultValue={currentProgress} aria-label="Default" valueLabelDisplay="auto" disabled={!update} color={calculatePriority()} onChange={handleSliderChange}/>
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
