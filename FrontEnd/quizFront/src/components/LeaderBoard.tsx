import React from 'react';
import styled from 'styled-components';

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

const LeaderBoard = () => {
  return (
    <StyledTable>
      <thead>
        <StyledTr>
          <StyledTh>Nome</StyledTh>
          <StyledTh>Pontuação</StyledTh>
        </StyledTr>
      </thead>
      <tbody>
        <StyledTr>
          <StyledTd>Zezinho</StyledTd>
          <StyledTd>100</StyledTd>
        </StyledTr>
        <StyledTr>
          <StyledTd>Zezinho</StyledTd>
          <StyledTd>100</StyledTd>
        </StyledTr>
        <StyledTr>
          <StyledTd>Zezinho</StyledTd>
          <StyledTd>100</StyledTd>
        </StyledTr>
      </tbody>
    </StyledTable>
  );
};

export default LeaderBoard;
