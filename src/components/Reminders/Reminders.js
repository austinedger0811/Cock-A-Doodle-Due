import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Reminder from './Reminder'
import NewReminder from './NewReminder'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const Reminders = () => {


  const [reminders, setReminders] = useState([])

  useEffect(() => {
    axios.get('/reminders').then((response) => {
      setReminders(response.data)
    }).catch(error => console.log(error))
  }, [])

  const handleReminderChange= (data) => {
    setReminders(data)
  }

  return (
    <Box mt={6}>
      <Box mb={2}>
        <Typography variant="h5">Reminders</Typography> 
        <Typography variant="body2">{`${reminders.length} remaining`}</Typography> 
      </Box>
      <Box>
        {reminders.map((todo) => { return(<Reminder key={todo.id} id={todo.id} value={todo.value} onReminderChange={handleReminderChange} />)})}
        <NewReminder onReminderChange={handleReminderChange} />
      </Box>
    </Box>
  )
}

export default Reminders 
