import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Reminder from './Reminder/Reminder'
import NewReminder from './NewReminder/NewReminder'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const Reminders = () => {


  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get('/todos').then((response) => {
      setTodos(response.data)
    }).catch(error => console.log(error))
  }, [])

  const handleTodoChange = (data) => {
    setTodos(data)
  }

  return (
    <Box mt={6}>
      <Box mb={2}>
        <Typography variant="h5">To-Dos</Typography> 
        <Typography variant="body2">{`${todos.length} left`}</Typography> 
      </Box>
      <Box>
        {todos.map((todo) => { return(<Reminder key={todo.id} id={todo.id} value={todo.value} onTodoChange={handleTodoChange} />)})}
        <NewReminder onTodoChange={handleTodoChange} />
      </Box>
    </Box>
  )
}

export default Reminders 
