import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CoinFlip from './pages/coinflip'

// Si usas Pages en subcarpeta, pon el basename para que el router funcione:
const BASENAME = '/Ajolote'

function App() {
  return (
    <BrowserRouter basename={BASENAME}>
      <Routes>
        <Route path="/" element={<CoinFlip />} />
        {/* agrega más rutas aquí si las necesitas */}
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
