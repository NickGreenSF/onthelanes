import { useContext, useState } from 'react';
import styled from 'styled-components';
import { postGame } from '../api/Requests';
import TwoInput from '../components/TwoInput';
import ThreeInput from '../components/ThreeInput';
import {
  TenWide,
  ScoreBox,
  ErrorMessage,
  FormHolder,
  height,
  width,
} from '../constants/Values';
import { AuthUserContext } from '../contexts/AuthContext';

const Label = styled.span`
  font-size: ${height / 50}px;
`;

const GridSet = styled.span`
  display: grid;
  grid-template-columns: 1fr 2fr;
  width: 50%;
  margin: auto;
  margin-bottom: ${height / 30}px;
`;

const SubmitButton = styled.button`
  border-radius: 10px;
  background-color: steelblue;
  color: white;
  font-size: ${height / 60}px;
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
  margin-top: 20px;
`;

export default function CreateGame() {
  const [frames] = useState([
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

  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const authContext = useContext(AuthUserContext);

  const [frameNums, setFrameNums] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [warning, setWarning] = useState('_');

  const submit = async () => {
    console.log(location);
    console.log(description);
    const currUser = authContext.user;
    if (currUser === null) {
      return;
    }
    const { uid } = currUser;
    try {
      await postGame({
        score: frameNums[9],
        frames: frames.join('|'),
        location: location !== '' ? location : undefined,
        description: description !== '' ? description : undefined,
        date: date !== '' ? date : undefined,
        uid,
      });
      window.location.href = `./profile?=${uid}`;
      // console.log(newGame);
    } catch (e) {
      setWarning('Error creating game.');
    }
  };

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

  if (authContext.accessed === false) {
    return <ErrorMessage>Loading...</ErrorMessage>;
  }

  if (authContext.user === null) {
    return <ErrorMessage>No user logged in</ErrorMessage>;
  }

  return (
    <FormHolder>
      {/* function must be referenced instead of passed in so it doesn't rerender every time */}
      <TenWide style={{ margin: 'auto' }}>
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
      <TenWide style={{ margin: 'auto' }}>
        {frameNums.map((score, i) => (
          <ScoreBox key={i}>{score}</ScoreBox>
        ))}
      </TenWide>
      <div style={warning === '_' ? { color: 'white' } : { color: 'black' }}>
        <Label>{warning}</Label>
      </div>
      <GridSet>
        <Label>Location:</Label>
        <input
          onChange={(ev) => {
            setLocation(ev.target.value);
          }}
        />
      </GridSet>
      <GridSet>
        <Label>Date:</Label>
        <input
          type="date"
          onChange={(ev) => {
            setDate(ev.target.value);
            console.log(date);
          }}
        />
      </GridSet>
      <div>
        <div>
          <Label>Description</Label>
        </div>
        <textarea
          style={{ height: height / 10, width: width * 0.4 }}
          maxLength={2000}
          onChange={(ev) => {
            setDescription(ev.target.value);
          }}
        />
      </div>
      <SubmitButton type="button" onClick={submit}>
        SUBMIT
      </SubmitButton>
    </FormHolder>
  );
}
