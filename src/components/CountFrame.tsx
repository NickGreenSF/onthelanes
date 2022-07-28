import styled, { StyledComponent } from 'styled-components';
import { Circle, flesh, height, width } from '../constants/Values';

const Box: StyledComponent<'div', any> = styled.div`
  border: 1px solid black;
  border-right: 0px;
  height: ${height / 10}px;
  font-size: ${height / 20}px;
  text-align: center;
  background-color: ${flesh};
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
`;

const TwoWide: StyledComponent<'div', any> = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ThreeWide: StyledComponent<'div', any> = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default function CountFrame(props: {
  frameText: string;
  splits: string;
}): JSX.Element {
  const { frameText, splits } = props;
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
      <div>
        <Circle
          style={{
            height: height / 10 - 20,
            marginTop: 10,
            width: (width / 21) * 0.8,
            border: '2px solid black',
            display: splits.charAt(0) === 't' ? 'block' : 'none',
          }}
        />
        <Circle
          style={{
            height: height / 10 - 20,
            marginTop: 10,
            marginLeft: (width / 21) * 0.8,
            width: (width / 21) * 0.8,
            border: '2px solid black',
            display: splits.charAt(1) === 't' ? 'block' : 'none',
          }}
        />
        <Circle
          style={{
            height: height / 10 - 20,
            marginTop: 10,
            marginLeft: (width / 21) * 1.6,
            width: (width / 21) * 0.8,
            border: '2px solid black',
            display: splits.charAt(2) === 't' ? 'block' : 'none',
          }}
        />
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
      </div>
    );
  }
  return (
    <div>
      <Circle
        style={{
          height: height / 10 - 20,
          marginTop: 10,
          width: (width / 21) * 0.8,
          border: '2px solid black',
          display: splits === 't' ? 'block' : 'none',
        }}
      />
      <TwoWide>
        <Box>{frameText.charAt(0)}</Box>
        <Box>{frameText.charAt(1)}</Box>
      </TwoWide>
    </div>
  );
}
