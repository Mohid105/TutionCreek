import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// IMPORT THIS:
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* WRAP APP LIKE THIS: */}
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)