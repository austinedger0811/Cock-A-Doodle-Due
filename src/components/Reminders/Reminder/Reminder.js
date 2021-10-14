import React, { useState } from 'react'
import axios from 'axios'

import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import Checkbox from '@mui/material/Checkbox'


const Reminder = ( {id, value, onReminderChange} ) => {

  const [checked, setChecked] = useState(false)

  const handleDelete = () => {
    setChecked(!checked)
    axios.delete(`/delete-reminder/${id}`)
      .then(response => onReminderChange(response.data))
      .catch(error => console.log(error))
  }
  return (
    <ListItem disablePadding>
      <ListItemButton role={undefined} onClick={handleDelete} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={value} disablePadding style={{textDecoration: checked ? 'line-through' : 'none'}} /> 
      </ListItemButton>
    </ListItem>
  )
}

export default Reminder 
