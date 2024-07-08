import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {CssBaseline} from "@mui/material"
import {ToastContainer} from "react-toastify"
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <><ToastContainer/>
    <CssBaseline></CssBaseline>
    <App />
    </>
    
  // </React.StrictMode>,
)
