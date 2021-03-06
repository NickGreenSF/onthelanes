import styled, { StyledComponent } from 'styled-components';

export const height: number = window.innerHeight;
export const width: number = window.innerWidth;

export const validChars: Set<string> = new Set([
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

export const ScoreBox: StyledComponent<'div', any> = styled.div`
  text-align: center;
  border: 1px solid black;
  border-right: 0px;
  height: ${height / 28}px;
  font-size: ${height / 40}px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

export const TenWide: StyledComponent<'div', any> = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 3fr;
  border-right: 1px solid black;
  width: ${width * 0.4}px;
`;

export const BoxInput: StyledComponent<'input', any> = styled.input`
  width: ${(width / 21) * 0.4}px;
  height: ${height / 28}px;
  font-size: ${height / 40}px;
  box-sizing: border-box;
`;

export const GameGrid: StyledComponent<'div', any> = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const ErrorMessage: StyledComponent<'div', any> = styled.div`
  background-color: white;
  width: ${width / 3}px;
  margin: auto;
  text-align: center;
  padding: 40px;
  margin-top: ${height / 10}px;
`;

export const FormHolder: StyledComponent<'div', any> = styled.div`
  background-color: white;
  text-align: center;
  padding: 40px;
  margin-top: ${height / 10}px;
  margin-left: ${width / 7}px;
  margin-right: ${width / 7}px;
  font-size: ${height / 40}px;
`;
