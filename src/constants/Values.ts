import styled from 'styled-components';

const height = window.innerHeight;
const width = window.innerWidth;

export const validChars = new Set([
  'X',
  '/',
  '-',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
]);

export const ScoreBox = styled.div`
  text-align: center;
  border: 1px solid black;
  border-right: 0px;
  height: ${height / 28}px;
  font-size: ${height / 32}px;
  background-color: white;
`;

export const TenWide = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 3fr;
  border-right: 1px solid black;
  width: ${width * 0.4}px;
`;

export const BoxInput = styled.input`
  width: ${(width / 21) * 0.4}px;
  height: ${height / 28}px;
  font-size: ${height / 32}px;
  box-sizing: border-box;
`;
