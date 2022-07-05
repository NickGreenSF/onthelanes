import { useContext } from 'react';
import styled from 'styled-components';
import { AuthUserContext } from '../contexts/AuthContext';

const width: number = window.innerWidth;

const Bar = styled.div`
  width: ${width}px;
  height: 50px;
  background-color: lightblue;
`;

export default function Navbar() {
  const authContext = useContext(AuthUserContext);

  return (
    <Bar>
      <a href="./">Home</a>
      <a href="./creategame">Create Game</a>
      <a href="./register">Register</a>
      <a href="./login">Login</a>
      <div>{authContext.username}</div>
    </Bar>
  );
}
