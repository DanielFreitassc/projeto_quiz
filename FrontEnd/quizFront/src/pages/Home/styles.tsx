import styled from 'styled-components'

export const Input = styled.input`
    border-radius: 6px;
    display: inline;
    width: 14em;
    height: 1.5em;
    padding: 5px;
    border: 1px black solid;
`

export const Button = styled.button`
    width: 5.5em;
    height: 1.5em;
    border-radius: 5px;
    background-color: #008cff;
    color: white;
    border: 1px blue solid;



    &:hover{
        background-color: blue;
    }
`

export const P = styled.p`
    font-size: 1.02em;
    margin-bottom: 0.7em;
    color: green;
`