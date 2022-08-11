import styled, { StyledComponent } from 'styled-components';

export const height: number = window.innerHeight;
export const width: number = window.innerWidth;

export const mobile: boolean = height > width;

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

export const noSplitChars: Set<string> = new Set(['X', '9', '-']);

export const salmon = '#ffb5a7';
export const flesh = '#fcd5ce';
export const white = '#f8edeb';
export const tan = '#f9dcc4';

export const ScoreBox: StyledComponent<'div', any> = styled.div`
  text-align: center;
  border: 1px solid black;
  border-right: 0px;
  height: ${mobile ? height / 15 : height / 8}px;
  font-size: ${mobile ? width / 25 : height / 15}px;
  background-color: ${flesh};
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

export const TenWide: StyledComponent<'div', any> = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 3fr;
  border-right: 1px solid black;
  width: ${width * 0.8}px;
`;

export const BoxInput: StyledComponent<'input', any> = styled.input`
  width: ${mobile ? (width / 21) * 0.8 : (width / 21) * 0.4}px;
  height: ${height / 28}px;
  font-size: ${height / 32}px;
  box-sizing: border-box;
  padding-left: ${mobile ? 2 : 4}px;
`;

export const Circle = styled.span`
  position: absolute;
  pointer-events: none;
  width: ${mobile ? (width / 21) * 0.8 : (width / 21) * 0.4}px;
  height: ${height / 28}px;
  font-size: ${height / 32}px;
  box-sizing: border-box;
  border: 1px solid black;
  border-radius: 50%;
  margin-top: 2px;
`;

export const GameGrid: StyledComponent<'div', any> = styled.div`
  display: grid;
  grid-template-columns: 1fr;
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
  background-color: ${white};
  text-align: center;
  padding: 40px;
  margin-top: ${height / 10}px;
  margin-left: ${mobile ? width / 20 : width / 7}px;
  margin-right: ${mobile ? width / 20 : width / 7}px;
  font-size: ${height / 30}px;
`;
