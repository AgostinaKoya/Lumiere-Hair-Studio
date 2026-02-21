import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { TurnsSelectProvider } from './context/TurnsSelectContext.jsx';

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <TurnsSelectProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </TurnsSelectProvider>
  </StrictMode>,
)
