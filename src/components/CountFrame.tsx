import styled from 'styled-components';

const Box = styled.div`
  border: 1px solid black;
  border-right: 0px;
`;

const TwoWide = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ThreeWide = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default function CountFrame(props: { frameText: string }) {
  const { frameText } = props;
  if (frameText.length === 1) {
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
