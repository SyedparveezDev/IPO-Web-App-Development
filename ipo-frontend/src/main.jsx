import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import IPOPage from './IPOPage.jsx' // you'll create this next
import './index.css'
import LoginPage from './LoginPage.jsx'
import CreateIPO from './CreateIPO.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/ipo/:id" element={<IPOPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreateIPO />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
