import styled, { StyledComponent } from 'styled-components';

const height: number = window.innerHeight;

const Box: StyledComponent<"div", any, {}, never> = styled.div`
  border: 1px solid black;
  border-right: 0px;
  height: ${height / 28}px;
  font-size: ${height / 40}px;
  text-align: center;
  background-color: white;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

const TwoWide: StyledComponent<"div", any, {}, never> = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ThreeWide: StyledComponent<"div", any, {}, never> = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default function CountFrame(props: { frameText: string }): JSX.Element {
  const { frameText } = props;
  if (frameText === 'X-') {
    return (
      <TwoWide>
        <Box>X</Box>
        <Box />
      </TwoWide>
    );
  }
  if (frameText.length === 3) {
    return (
      <ThreeWide>
        <Box>{frameText.charAt(0)}</Box>
        <Box>{frameText.charAt(1)}</Box>
        <Box>
          {frameText.charAt(2) === '-' &&
          frameText.charAt(1) !== '/' &&
          frameText.charAt(0) !== 'X'
            ? ''
            : frameText.charAt(2)}
        </Box>
      </ThreeWide>
    );
  }
  return (
    <TwoWide>
      <Box>{frameText.charAt(0)}</Box>
      <Box>{frameText.charAt(1)}</Box>
    </TwoWide>
  );
}
