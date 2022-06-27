import { useState, useRef } from 'react';
import { samplePostGame } from '../api/Requests';

// const inputSetLocation: { [key: number]: number } = {
//   0: 0,
//   1: 0,
//   2: 1,
//   3: 1,
//   4: 2,
//   5: 2,
//   6: 3,
//   7: 3,
//   8: 4,
//   9: 4,
//   10: 5,
//   11: 5,
//   12: 6,
//   13: 6,
//   14: 7,
//   15: 7,
//   16: 8,
//   17: 8,
//   18: 9,
//   19: 9,
//   20: 9,
// };

export default function CreateGame() {
  const [data, setData] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];

  const [error, setError] = useState('');

  //   function retrieveScoreWithCompletion() {
  //     const sepFrames: string[] = data;
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

  function validData() {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i] === '') {
        return false;
      }
    }
    return true;
  }

  async function submit() {
    if (validData()) {
      try {
        const newGame = await samplePostGame({
          score: 0,
          frames: 'HEEHEEHOOHOO',
        });
        console.log(newGame);
      } catch (e) {
        // TODO: Display error toast, but for now, just log
        console.log(e);
      }
    }
  }
  return (
    <div>
      <button type="submit" onClick={submit}>
        test yay
      </button>
    </div>
  );
}
