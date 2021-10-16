import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { signInWithGoogle, logOut } from '../../services/firebase'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'


const NavBar = () => {

  const { currentUser } = useAuth()

  const renderLogin = () => {
    if (currentUser) {

      return (<Button color="inherit" onClick={logOut}>Logout</Button>)
    } else {
      return (<Button color="inherit" onClick={signInWithGoogle}>Login</Button>)
    }
  }

  const renderAvatar = () => {
    if (currentUser) {
      return (<Avatar sx={{marginLeft: '12px'}} alt={currentUser.displayName} src={currentUser.photoURL} />)
    }
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Cock-A-Doodle-Due</Typography>
        {renderLogin()}
        {renderAvatar()}
      </Toolbar>
    </AppBar> 
  )
}

export default NavBar
