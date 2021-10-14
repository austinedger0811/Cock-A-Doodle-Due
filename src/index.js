import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import App from './components/App'

import ThemeProvider from '@mui/material/styles/ThemeProvider'
import CssBaseline from '@mui/material/CssBaseline'

import theme from './assets/theme'
import './index.css'

axios.defaults.baseURL = 'http://localhost:5000/api/v1'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);