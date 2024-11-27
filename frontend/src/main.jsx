import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectContextProvider } from './context/ProjectContext.jsx'
import { AuthProvider } from  './context/AuthContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ProjectContextProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ProjectContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
