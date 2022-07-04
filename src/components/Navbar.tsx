import styled from 'styled-components';

const width: number = window.innerWidth;

const Bar = styled.div`
  width: ${width}px;
  height: 50px;
  background-color: lightblue;
`;

export default function Navbar() {
  return (
    <Bar>
      <a href="./">Home</a>
      <a href="./creategame">Create Game</a>
      <a href="./register">Register</a>
    </Bar>
  );
}
