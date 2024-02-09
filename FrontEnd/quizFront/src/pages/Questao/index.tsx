import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePontuacao } from '../../context/pontuacaoContext';
import { useMessage } from '../../context/mensagemContext';
import { useNome } from '../../context/nomeContext';


const Questao = () => {
  const { pontuacao, aumentarPontuacao, setPontuacao } = usePontuacao();
  const [correta, setCorreta] = useState('')
  const [questao, setQuestao] = useState({});
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const { setMessage } = useMessage();
  const { nome } = useNome();
  const [alternativas, setAlternativas] = useState<string[]>([])

  function shuffle(array:string[]) {
    var m = array.length, t, i;
  
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
    console.log(data)

    const alternativaCorreta = organizarQuestao(dataShuffle, data.respostaCorreta)
    console.log(alternativaCorreta)

    setAlternativas(dataShuffle)
    setCorreta(alternativaCorreta)
    setQuestao(data);
  };

  const sendUser = async() => {
    const user = {
      nome,
      pontos: pontuacao
    }

    try{
      await fetch('https://backend-quiz-7j7n.onrender.com/usuario',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
      })
    }catch(error){
      console.error('Ocorreu um erro:', error.message);
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
      <p id='titulo'>{questao && questao.texto}</p>
      <p
        id='a'
        className={click ? (correta === 'a' ? 'correta' : 'errada') : 'alternativa'}
        onClick={(e) => handlePergunta(e)}
      >
        A) {alternativas && alternativas[0]}
      </p>
      <p id='b' className={click ? (correta === 'b' ? 'correta' : 'errada' ) : 'alternativa'}onClick={(e) => handlePergunta(e)}>
        B) {alternativas && alternativas[1]}
      </p>
      <p id='c' className={click ? (correta === 'c' ? 'correta' : 'errada' ) : 'alternativa'}onClick={(e) => handlePergunta(e)}>
        C) {alternativas && alternativas[2]}
      </p>
      <p id='d' className={click ? (correta === 'd' ? 'correta' : 'errada' ) : 'alternativa'}onClick={(e) => handlePergunta(e)}>
        D) {alternativas && alternativas[3]}
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

  @media screen and (max-width: 490px) {
    * {
      width: 14em;
      font-size: 0.9em;
    }

    #titulo {
      font-size: 1.3em;
    }
  }
`;

export default Questao;