import { useState } from 'react'
import { Input, Button, P } from './styles'
import { useNavigate } from 'react-router-dom'
import { useNome } from '../../context/nomeContext'
import { useMessage } from '../../context/mensagemContext'

import LeaderBoard from '../../components/LeaderBoard'

const Home = () => {

  const [nome, setNomeLocal] = useState('')
  const [erro, setErro] = useState('')
  const { setNome } = useNome()
  const navigate = useNavigate()
  const {message} = useMessage()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(nome === ''){
      setErro('Nome esta vazio')
      return
    }

    setNome(nome)
    navigate('/questao')

  }

  return (
    <main>
      <section>
        {message && <P>{message}</P>}
        <h1>Quiz</h1>
        <h4>Seu nome:</h4>
        <form onSubmit={handleSubmit}>
          <Input type="text" onChange={(e) => setNomeLocal(e.target.value)} />
          <Button type='submit'>Começar</Button>
        </form>
        {erro && <p className='erro'>{erro}</p>}
        <LeaderBoard />
      </section>
    </main>
  )
}

export default Home