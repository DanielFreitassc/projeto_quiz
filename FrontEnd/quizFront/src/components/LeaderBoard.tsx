import { useEffect, useState } from 'react';
import styled from 'styled-components';



const LeaderBoard = () => {

  const [ranking, setRanking] = useState([])

  useEffect(() => {
    const fetchUser = async() => {
      const res = await fetch('https://backend-quiz-7j7n.onrender.com/usuario')

      const data = await res.json()

      console.log(data)
      setRanking(data)
    }

    fetchUser()
  },[])

  return (
    <StyledTable>
      <thead>
        <StyledTr>
          <StyledTh>Nome</StyledTh>
          <StyledTh>Pontuação</StyledTh>
        </StyledTr>
      </thead>
      <tbody>
        {ranking.map((pessoa) => (
        <StyledTr key={pessoa.id}>
          <StyledTd>{pessoa.nome}</StyledTd>
          <StyledTd>{pessoa.pontos}</StyledTd>
        </StyledTr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default LeaderBoard;


const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const StyledTh = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

const StyledTd = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const StyledTr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;