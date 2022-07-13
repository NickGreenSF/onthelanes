import { useState } from 'react';
import styled from 'styled-components';
import { GameProps } from '../types';
import { TenWide, ScoreBox } from '../constants/Values';
import CountFrame from './CountFrame';

const width: number = window.innerWidth;
const height: number = window.innerHeight;

const NameHolder = styled.div``;

const FramesHolder = styled.div`
  margin-top: ${height / 30}px;
  margin-left: ${width / 20}px;
  width: ${width * 0.4 + 1}px;
`;

const ProfileLink = styled.a`
  margin-left: 0.5em;
`;

const Arrow = styled.button`
  width: 100%;
  border: 0;
  cursor: pointer;
  background-color: whitesmoke;
`;

const Desc = styled.div`
  transition: height ease 0.5s;
  overflow-y: scroll;
  overflow-wrap: break-word;
  background-color: white;
`;

function retrieveScore(frames: string) {
  const sepFrames: string[] = frames.split('|');
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
  return scores;
}

const initBool = false;

export default function GameWDesc(props: { game: GameProps; i: number }) {
  const [accordion, setAccordion] = useState(initBool);
  const { game, i } = props;
  const [location] = useState(
    game.location !== null ? game.location : 'not given'
  );
  return (
    <FramesHolder key={`game${i}`}>
      <NameHolder>
        <ProfileLink href={`./profile?=${game.user_id}`}>
          {game.username}
        </ProfileLink>
      </NameHolder>
      <div>
        <TenWide>
          {game.frames.split('|').map((frame, j) => (
            <CountFrame key={`game${i}frame${j}`} frameText={frame} />
          ))}
        </TenWide>
        <TenWide>
          {retrieveScore(game.frames).map((score, k) => (
            <ScoreBox key={`game${i}score${k}`}>{score}</ScoreBox>
          ))}
        </TenWide>
      </div>
      <Desc style={accordion ? { height: height / 10 } : { height: '0px' }}>
        <div>Location: {location}</div>
        <span>{game.description}</span>
      </Desc>
      <Arrow
        className={game.description || game.location ? '' : 'none'}
        type="button"
        onClick={() => setAccordion(!accordion)}
      >
        {accordion ? '▲' : '▼'}
      </Arrow>
    </FramesHolder>
  );
}
