import React, { useState, useEffect, useContext } from 'react'
import { auth } from '../services/firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    }) 
  }, [])

  const value = {
    currentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}