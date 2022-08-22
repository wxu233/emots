import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import TopNav from './nav'
import Display from './Display'
import Sidebar from './Sidebar'
import { AuthProvider } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  const { currentTheme } = useTheme()

  return (
    <AuthProvider>
      <div 
          className="App "
          style={{
            backgroundColor: currentTheme.colors.background,
            width: '100vw',
            height: '100vh',
            display: 'block',
          }}
      >
        <div className="side-bar">
          <BrowserRouter>
            {/* <TopNav /> */}
            <Sidebar />
            <Routes>
              <Route path="/" />
            </Routes>
          </BrowserRouter>
        </div>
        <div className="content">
          <Display />
        </div>
      </div>
    </AuthProvider>
  )
}

export default App;
