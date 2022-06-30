import { useState, useRef } from 'react';
import styled from 'styled-components';
import { samplePostGame } from '../api/Requests';
import TwoInput from '../components/TwoInput';
import ThreeInput from '../components/ThreeInput';
import { TenWide, ScoreBox } from '../constants/Values';

export default function CreateGame() {
  const [frames, setFrames] = useState([
    '--',
    '--',
    '--',
    '--',
    '--',
    '--',
    '--',
    '--',
    '--',
    '---',
  ]);

  const [frameNums, setFrameNums] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [warning, setWarning] = useState('');

  function retrieveScore() {
    const sepFrames: string[] = frames;
    const scores: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < 9; i += 1) {
      let digitsSought = 0;
      if (sepFrames[i].length !== 0) {
        if (sepFrames[i] === 'X-') {
          digitsSought = 2;
          scores[i] = 10;
        } else if (sepFrames[i].charAt(1) === '/') {
          digitsSought = 1;
          scores[i] = 10;
        } else if (sepFrames[i].charAt(1) === '-') {
          if (sepFrames[i].charAt(0) === '-') {
            scores[i] = 0;
          } else {
            scores[i] = parseInt(sepFrames[i].charAt(0));
          }
        } else if (sepFrames[i].charAt(0) === '-') {
          scores[i] = parseInt(sepFrames[i].charAt(1));
        } else {
          scores[i] =
            parseInt(sepFrames[i].charAt(0)) + parseInt(sepFrames[i].charAt(1));
        }
        let j = i + 1;
        while (digitsSought > 0) {
          for (let k = 0; k < sepFrames[j].length; k += 1) {
            const kChar = sepFrames[j][k];
            if (kChar === 'X') {
              scores[i] += 10;
              if (j !== 9) {
                digitsSought -= 1;
                break;
              }
            } else if (kChar === '/') {
              scores[i] = 20;
            } else if (kChar !== '-') {
              scores[i] += parseInt(kChar);
            }
            digitsSought -= 1;
            if (digitsSought === 0) {
              break;
            }
          }
          j += 1;
        }
      }
      if (i > 0) {
        scores[i] += scores[i - 1];
      }
    }
    if (sepFrames[9].length === 3) {
      for (let k = 0; k < 3; k += 1) {
        const kChar = sepFrames[9][k];
        if (kChar === 'X') {
          scores[9] += 10;
        } else if (kChar === '/') {
          while (scores[9] % 10 !== 0) {
            scores[9] += 1;
          }
        } else if (kChar !== '-') {
          scores[9] += parseInt(kChar);
        }
      }
    }
    scores[9] += scores[8];
    setFrameNums(scores);
  }

  function changeData(inp: string, frame: number) {
    // console.log(inp);
    frames[frame] = inp;
    retrieveScore();
  }

  function changeWarning(inp: string) {
    setWarning(inp);
  }

  // const Grid = styled.div`
  //   display: grid;
  //   grid-template-columns: 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 2fr 3fr;
  // `

  return (
    <div>
      {/* function must be referenced instead of passed in so it doesn't rerender every time */}
      <TenWide>
        <TwoInput
          changeFrame={(frame) => changeData(frame, 0)}
          changeWarning={(warn) => changeWarning(warn)}
        />
        <TwoInput
          changeFrame={(frame) => changeData(frame, 1)}
          changeWarning={(warn) => changeWarning(warn)}
        />
        <TwoInput
          changeFrame={(frame) => changeData(frame, 2)}
          changeWarning={(warn) => changeWarning(warn)}
        />
        <TwoInput
          changeFrame={(frame) => changeData(frame, 3)}
          changeWarning={(warn) => changeWarning(warn)}
        />
        <TwoInput
          changeFrame={(frame) => changeData(frame, 4)}
          changeWarning={(warn) => changeWarning(warn)}
        />
        <TwoInput
          changeFrame={(frame) => changeData(frame, 5)}
          changeWarning={(warn) => changeWarning(warn)}
        />
        <TwoInput
          changeFrame={(frame) => changeData(frame, 6)}
          changeWarning={(warn) => changeWarning(warn)}
        />
        <TwoInput
          changeFrame={(frame) => changeData(frame, 7)}
          changeWarning={(warn) => changeWarning(warn)}
        />
        <TwoInput
          changeFrame={(frame) => changeData(frame, 8)}
          changeWarning={(warn) => changeWarning(warn)}
        />
        <ThreeInput
          changeFrame={(frame) => changeData(frame, 9)}
          changeWarning={(warn) => changeWarning(warn)}
        />
      </TenWide>
      <TenWide>
        {frameNums.map((score) => (
          <ScoreBox>{score}</ScoreBox>
        ))}
      </TenWide>
      <div>{warning}</div>
    </div>
  );
}
