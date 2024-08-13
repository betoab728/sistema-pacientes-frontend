import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import  {AppRouter }from './AppRouter'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import './index.css'
import { UserProvider } from './contexts/UserContext'
import { JobProvider } from './contexts/JobContext'
import { PatientProvider } from './contexts/PatientContext';
import { DoctorProvider } from './contexts/DoctorContext';
import { AppointmentProvider } from './contexts/AppointmentContext';


ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <AppointmentProvider>
    <DoctorProvider> {/* Envolver con DoctorProvider */}
      <PatientProvider>
      <UserProvider>
      <JobProvider> {/* Envolver con JobProvider */}
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </JobProvider>
      </UserProvider>
      </PatientProvider>
      </DoctorProvider>
    </AppointmentProvider>
  </React.StrictMode>
 
);
