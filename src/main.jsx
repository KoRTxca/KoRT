import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import SovereignRoot from './SovereignRoot.jsx'
import './index.css'

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <SovereignRoot />
      </BrowserRouter>
    </StrictMode>,
  )
}
