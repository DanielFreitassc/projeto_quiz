import { BrowserRouter,Routes, Route } from 'react-router-dom'
import {createGlobalStyle} from 'styled-components'

import Home from './pages/Home'
import Questao from './pages/Questao'

function App() {

  return (
    <>
      
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/questao' element={<Questao />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  main{
    height: 100vh;
    font-family: 'roboto',Arial, Helvetica, sans-serif;
    background: linear-gradient(to bottom, darkblue, blue, lightblue);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  section{
    background-color: white;
    padding: 10px;
    border-radius: 10px;
  }

  .erro {
    font-size: 13px;
    color: red;
  }
`

export default App
