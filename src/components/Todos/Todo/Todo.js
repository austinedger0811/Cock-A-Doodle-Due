import React, { useState } from 'react'

import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemButton from '@mui/material/ListItemButton'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'


const Todo = ( {value} ) => {

  const [checked, setChecked] = useState(false)

  const handleToggle = () => {
    setChecked(!checked)
  }
  return (
    <ListItem disablePadding>
      <ListItemButton role={undefined} onClick={handleToggle} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText primary={value} disablePadding /> 
      </ListItemButton>
    </ListItem>
  )
}

export default Todo
