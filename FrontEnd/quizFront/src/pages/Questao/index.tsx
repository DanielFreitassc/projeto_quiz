import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePontuacao } from '../../context/pontuacaoContext';
import { useMessage } from '../../context/mensagemContext';
import { useNome } from '../../context/nomeContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'


interface QuestaoInterface {
  texto:string
}

const Questao = () => {
  const { pontuacao, aumentarPontuacao, setPontuacao } = usePontuacao();
  const [correta, setCorreta] = useState('')
  const [questao, setQuestao] = useState<QuestaoInterface>({texto:""});
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const { setMessage } = useMessage();
  const { nome } = useNome();
  const [alternativas, setAlternativas] = useState<string[]>([])

  function shuffle(array:string[]) {
    let m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

  const organizarQuestao = (dataShuffle:string[], respostaCerta: string) => {

    const iCorreta = dataShuffle.indexOf(respostaCerta)

    switch(iCorreta){
      case 0:
        return 'a'
      
      case 1:
        return 'b'

      case 2:
        return 'c'
      
      case 3:
        return 'd'
    }
  }

  const fetchQuestion = async () => {
    const res = await fetch('https://backend-quiz-7j7n.onrender.com/quiz/pergunta/aleatoria');

    const data = await res.json();

    const dataShuffle = shuffle([data.respostaCorreta, data.respostaErradaUm,data.respostaErradaDois, data.respostaErradaTres
    ])

    const alternativaCorreta:string | undefined = organizarQuestao(dataShuffle, data.respostaCorreta)

    setAlternativas(dataShuffle)
    if (alternativaCorreta !== undefined) {
      setCorreta(alternativaCorreta)
    }
    setQuestao(data);
  };

  const sendUser = async() => {
    const user = {
      nome,
      pontos: pontuacao
    }

    try {
      await fetch('https://backend-quiz-7j7n.onrender.com/usuario', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error('Ocorreu um erro:', error.message);
      } else {
        console.error('Ocorreu um erro desconhecido.');
      }
    }
  }


  const handlePergunta = (e: React.MouseEvent<HTMLParagraphElement>) => {
    if (click) {
      return;
    }
    setClick(true);

    const alternative = e.currentTarget.id;

    if (alternative === correta) {
      aumentarPontuacao();

      setClick(true)
      setTimeout(() => {
        fetchQuestion()
      }, 1300)
    } else {
      setMessage(`Parabéns ${nome}, você conseguiu ${pontuacao} pontos!`);
      setPontuacao(0)
      sendUser()
      setTimeout(() => {
        navigate('/');
      }, 1300);
    }
  };


  useEffect(() => {

    if(nome === undefined || nome === null){
      navigate('/')
    }

    fetchQuestion()

  }, []);

  useEffect(() => {
    setTimeout(() => {
      setClick(false)
    }, 1300)
  }, [click])


  return (
    <Main>
      <p>Pontuação: {pontuacao}</p>
      <p id='titulo'>{questao.texto || <Skeleton className='skeleton-title' />}</p>
      <p
        id='a'
        className={click ? (correta === 'a' ? 'correta' : 'errada') : 'alternativa'}
        onClick={(e) => handlePergunta(e)}
      >
        A) {alternativas[0] || <Skeleton className='loading'/>}
      </p>
      <p id='b' className={click ? (correta === 'b' ? 'correta' : 'errada' ) : 'alternativa'} onClick={(e) => handlePergunta(e)}>
        B) {alternativas[1] || <Skeleton className='loading' />}
      </p>
      <p id='c' className={click ? (correta === 'c' ? 'correta' : 'errada' ) : 'alternativa'}onClick={(e) => handlePergunta(e)}>
        C) {alternativas[2] || <Skeleton className='loading' />}
      </p>
      <p id='d' className={click ? (correta === 'd' ? 'correta' : 'errada' ) : 'alternativa'}onClick={(e) => handlePergunta(e)}>
        D) {alternativas[3] || <Skeleton className='loading' />}
      </p>
      </Main>
  );
};

const Main = styled.main`
  flex-direction: column;
  justify-content: space-around;

  * {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    width: 25em;
  }

  #titulo {
    font-size: 2em;
  }

  .correta {
    background-color: lightgreen;
    color: white;
  }

  .errada {
    background-color: red;
    color: white;
  }

  .alternativa {
    cursor: pointer;
  }

  .alternativa:hover {
    background-color: #ccc;
  }

  .skeleton-title{
    width: 13em;
  }

  .loading{
    width: 9em;
  }

  @media screen and (max-width: 490px) {
    * {
      width: 14em;
      font-size: 0.9em;
    }

    #titulo {
      font-size: 1.3em;
    }
  }

  @media (max-width:900px){
    .loading{
      width: 100;
    }
  }
`;

export default Questao;