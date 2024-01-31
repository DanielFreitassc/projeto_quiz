import { useState } from 'react'
import { Input, Button } from './styles'
import { useNavigate } from 'react-router-dom'

import LeaderBoard from '../../components/LeaderBoard'
import { useNome } from '../../context/nomeContext'

const Home = () => {

  const [nome, setNomeLocal] = useState('')
  const [erro, setErro] = useState('')
  const { setNome } = useNome()
  const navigate = useNavigate()

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
        <h1>Quiz</h1>
        <h4>Seu nome:</h4>
        <form onSubmit={handleSubmit}>
          <Input type="text" onChange={(e) => setNome(e.target.value)} />
          <Button type='submit'>Começar</Button>
        </form>
        {erro && <p className='erro'>{erro}</p>}
        <LeaderBoard />
      </section>
    </main>
  )
}

export default Home