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
  height: ${height / 14}px;
  font-size: ${height / 16}px;
  background-color: white;
`;

export const TenWide = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 3fr;
  border-right: 1px solid black;
  width: ${width * 0.8}px;
`;

export const BoxInput = styled.input`
  width: ${(width / 21) * 0.8}px;
  height: ${height / 14}px;
  font-size: ${height / 16}px;
  box-sizing: border-box;
`;
