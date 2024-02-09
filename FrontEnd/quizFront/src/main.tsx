import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PontuacaoProvider } from './context/pontuacaoContext.tsx'
import { NomeProvider } from './context/nomeContext.tsx'
import { MessageProvider } from './context/mensagemContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <PontuacaoProvider>
    <NomeProvider>
    <MessageProvider>
      <App />
    </MessageProvider>
    </NomeProvider>
    </PontuacaoProvider>
)
