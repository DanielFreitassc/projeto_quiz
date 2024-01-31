import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PontuacaoProvider } from './context/pontuacaoContext.tsx'
import { NomeProvider } from './context/nomeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PontuacaoProvider>
    <NomeProvider>
      <App />
    </NomeProvider>
    </PontuacaoProvider>
  </React.StrictMode>,
)
