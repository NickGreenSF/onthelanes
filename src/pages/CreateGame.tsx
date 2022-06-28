import { useState, useRef } from 'react';
import { samplePostGame } from '../api/Requests';
import TwoInput from '../components/TwoInput';

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

  const [error, setError] = useState('');

  function changeData(inp: string) {
    console.log(inp);
  }

  //   function retrieveScoreWithCompletion() {
  //     const sepFrames: string[] = frames;
  //     let complete = 0;
  //     const scores: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  //     for (let i = 0; i < 9; i += 1) {
  //       let digitsSought = 0;
  //       if (sepFrames[i].length !== 0) {
  //         if (sepFrames[i] === 'X') {
  //           digitsSought = 2;
  //           scores[i] = 10;
  //         } else if (sepFrames[i].charAt(1) === '/') {
  //           digitsSought = 1;
  //           scores[i] = 10;
  //         } else if (sepFrames[i].charAt(1) === '-') {
  //           scores[i] = parseInt(sepFrames[i].charAt(0));
  //         } else {
  //           scores[i] =
  //             parseInt(sepFrames[i].charAt(0)) + parseInt(sepFrames[i].charAt(1));
  //         }
  //         let j = i + 1;
  //         while (digitsSought > 0) {
  //           for (let k = 0; k < sepFrames[j].length; k += 1) {
  //             const kChar = sepFrames[j][k];
  //             if (kChar === 'X') {
  //               scores[i] += 10;
  //             } else if (kChar === '/') {
  //               scores[i] = 20;
  //             } else if (kChar !== '-') {
  //               scores[i] += parseInt(kChar);
  //             }
  //             digitsSought -= 1;
  //             if (digitsSought === 0) {
  //               break;
  //             }
  //           }
  //           j += 1;
  //         }
  //       } else {
  //         complete = 1;
  //       }
  //       if (i > 0) {
  //         scores[i] += scores[i - 1];
  //       }
  //     }
  //     if (sepFrames[9].length === 3) {
  //       for (let k = 0; k < 3; k += 1) {
  //         const kChar = sepFrames[9][k];
  //         if (kChar === 'X') {
  //           scores[9] += 10;
  //         } else if (kChar === '/') {
  //           while (scores[9] % 10 !== 0) {
  //             scores[9] += 1;
  //           }
  //         } else if (kChar !== '-') {
  //           scores[9] += parseInt(kChar);
  //         }
  //       }
  //     } else {
  //       complete = 1;
  //     }
  //     scores[9] += scores[8];
  //     console.log(scores, complete);
  //     return { scores, complete };
  //   }
  return (
    <div>
      {/* function must be referenced instead of passed in so it doesn't rerender every time */}
      <TwoInput changeFrame={(frame) => changeData(frame)} />
    </div>
  );
}
