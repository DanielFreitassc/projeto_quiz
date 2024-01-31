import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { usePontuacao } from '../../context/pontuacaoContext';
import { useEffect, useState } from 'react';

const Questao = () => {
  const { pontuacao, aumentarPontuacao } = usePontuacao();
  const navigate = useNavigate();
  const correta = 'a';
  const [click, setClick] = useState(false)
  const alternativaCorreta = 'a'

  const handlePergunta = (e: React.MouseEvent<HTMLParagraphElement>) => {
    if (click) {
      return;
    }

    const alternative = e.currentTarget.id;

    if (alternative === correta) {
      aumentarPontuacao();
      
      setTimeout(() => {
        navigate('/questao');
      }, 1000);
    }
    setClick(true);

  };

  useEffect(() => {
    setTimeout(() => {
      setClick(false)
    }, 1000)
  })

  return (
    <Main>
      <p>Pontuação: {pontuacao}</p>
      <p id='titulo'>Quem é o melhor do mundo?</p>
      <p id='a' className={click ? alternativaCorreta === 'a' ? 'correta' : 'errada' : ''} onClick={(e) => handlePergunta(e)}>
        A) Eu
      </p>
      <p id='b' className={click ? alternativaCorreta === 'b' ? 'correta' : 'errada' : ''} onClick={(e) => handlePergunta(e)}>
        B) Tu
      </p>
      <p id='c' className={click ? alternativaCorreta === 'c' ? 'correta' : 'errada' : ''} onClick={(e) => handlePergunta(e)}>
        C) Nóis
      </p>
      <p id='d' className={click ? alternativaCorreta === 'd' ? 'correta' : 'errada' : ''} onClick={(e) => handlePergunta(e)}>
        D) Bota nela
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
