import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import FunctionChain from './FunctionChain.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FunctionChain />
  </StrictMode>,
)
