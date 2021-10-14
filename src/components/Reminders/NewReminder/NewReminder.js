import React, { useState } from 'react'
import axios from 'axios'

import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import InputBase from '@mui/material/InputBase'

const NewReminder = ({ onReminderChange }) => {

  const [value, setValue] = useState('')

  const handleValueChange = (data) => {
    setValue(data)
  }

  const afterCreate = (data) => {
    onReminderChange(data)
    setValue('')
  }

  const createReminder = (event) => {
    event.preventDefault();
    if (value !== '') {
      const newTodo = { value: value }
      axios.post('/add-reminder', newTodo)
      .then(response => afterCreate(response.data))
      .catch(error => console.log(error))
    }
  }

  return (
    <ListItem disablePadding>
      <Box pl={2} display="flex" alignItems="center">
        <ListItemIcon>
          <Checkbox edge="start" checked={false} disableRipple />
        </ListItemIcon>
        <form onSubmit={event => createReminder(event)}>
          <InputBase placeholder="New Reminder" value={value} onChange={(event) => handleValueChange(event.target.value)}/>
        </form>
      </Box>
    </ListItem>
  )
}

export default NewReminder 
