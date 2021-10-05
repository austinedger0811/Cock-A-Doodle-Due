import React, { useState } from 'react'
import axios from 'axios'

import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import Collapse from '@mui/material/Collapse'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Slider from '@mui/material/Slider'
import Typography from '@mui/material/Typography'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'

import AddIcon from '@mui/icons-material/Add'

const Section = ({ type, count, hours, onAssignmentChange }) => {

  const info = `${count} ${count > 1 ? "assignments" : "assignment"}, ${hours} ${hours > 1 ? "hours" : "hour"}`
  const baseURL = 'http://localhost:5000/api/v1'

  const [open, setOpen] = useState(false)
  const [name, setName] = useState(null)
  const [description, setDescription] = useState(null)
  const [estimate, setEstimate] = useState(0)
  const [date, setDate] = useState(null)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName(null)
    setDescription(null)
    setEstimate(0)
    setDate(null)
  };

  const afterCreate = (data) => {
    onAssignmentChange(data)
    handleClose()
  }

  const createAssignment = () => {

    const newAssignment = {
      name: name,
      description: description,
      estimate: estimate,
      date: date
    }

    axios.post(`${baseURL}/add-assignment`, newAssignment)
    .then(response => afterCreate(response.data))
    .catch(error => console.log(error))
  }

  return (
    <Box mt={6} mb={2} display="flex" justifyContent="space-between">
      <Box>
        <Typography variant='h5'>{type}</Typography> 
        <Typography variant='body2'>{info}</Typography> 
      </Box>
      <Box>
        <Collapse in={type === "Active"}>
          <Fab size="medium" color="primary" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Assignment</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Create a new assignment by adding the assignment name, a sort description, due date, and an estimate of how long it will take you to complete.
              </DialogContentText>
              <Stack spacing={3}>
                <TextField
                  margin="dense"
                  id="name"
                  label="Assignment"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(event) => setName(event.target.value)}
                />
                <TextField
                  margin="dense"
                  id="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(event) => setDescription(event.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    label="Due Date"
                    value={date}
                    onChange={(newValue) => {
                      setDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />

                </LocalizationProvider>
                <Box mt={2}>
                  <Typography gutterBottom>Estimated Hours</Typography>
                  <Slider
                    defaultValue={0}
                    aria-label="hours"
                    valueLabelDisplay="auto"
                    step={.5}
                    min={0}
                    max={20}
                    onChange={(event) => setEstimate(event.target.value)}
                  />
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={createAssignment}>Create</Button>
            </DialogActions>
          </Dialog>
        </Collapse>
      </Box>
    </Box>
  )
}

export default Section 
