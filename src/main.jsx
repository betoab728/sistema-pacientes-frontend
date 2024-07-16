import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import  {AppRouter }from './AppRouter'
import './index.css'
import { UserProvider } from './contexts/UserContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  

  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
      <AppRouter />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
 
);
