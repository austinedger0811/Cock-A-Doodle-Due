import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Todo from './Todo/Todo'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'


const Todos = () => {

  const baseURL = 'http://localhost:5000/api/v1'

  const [todos, setTodos] = useState([])

  useEffect(() => {
    axios.get(`${baseURL}/todos`).then((response) => {
      setTodos(response.data)
    }).catch(error => console.log(error))
  }, [])

  return (
    <Box mt={6}>
      <Box mb={2}>
        <Typography variant="h5">To-Dos</Typography> 
        <Typography variant="body2">{`${todos.length} left`}</Typography> 
      </Box>
      <Box>
        {todos.map((todo, key) => { return(<Todo key={key} value={todo.value} />)})}
      </Box>
    </Box>
  )
}

export default Todos
