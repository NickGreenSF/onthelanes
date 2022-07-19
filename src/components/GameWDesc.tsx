import { Dispatch, SetStateAction, useContext, useState } from 'react';
import styled, { StyledComponent } from 'styled-components';
import { User, Auth } from 'firebase/auth';
import { GameProps } from '../types';
import { TenWide, ScoreBox, width, height } from '../constants/Values';
import CountFrame from './CountFrame';
import { AuthUserContext } from '../contexts/AuthContext';
import { deleteGame } from '../api/Requests';

const FramesHolder: StyledComponent<'div', any> = styled.div`
  margin-top: ${height / 30 - 10}px;
  margin-left: ${width / 20 - 20}px;
  width: ${width * 0.4 + 1}px;
  background-color: white;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
`;

const ProfileLink: StyledComponent<'a', any> = styled.a`
  margin-left: 0.5em;
`;

const Arrow: StyledComponent<'button', any> = styled.button`
  width: 100%;
  border: 0;
  cursor: pointer;
  background-color: white;
`;

const Annotation: StyledComponent<'div', any> = styled.div`
  margin: 1em;
  font-style: italic;
`;

const Desc: StyledComponent<'div', any> = styled.div`
  transition: height ease 0.5s;
  overflow-y: scroll;
  overflow-wrap: break-word;
  background-color: white;
  font-size: ${height / 50}px;
`;

const DescText: StyledComponent<'div', any> = styled.div`
  padding-left: 1em;
  padding-right: 1em;
`;

const DeleteGameButton: StyledComponent<'a', any> = styled.a`
  display: inline-block;
  font-size: ${height / 60}px;
  padding: 5px;
  padding-top: 1px;
  padding-bottom: 1px;
  color: white;
  background-color: red;
  border-radius: 10px;
  text-decoration: none;
  float: right;
  :hover {
    color: white;
    cursor: pointer;
    text-decoration: underline;
  }
`;

function retrieveScore(frames: string): number[] {
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
      let j: number = i + 1;
      while (digitsSought > 0) {
        for (let k = 0; k < sepFrames[j].length; k += 1) {
          const kChar: string = sepFrames[j][k];
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
      const kChar: string = sepFrames[9][k];
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

async function deleteGameLocal(id: number): Promise<void> {
  await deleteGame({ id });
  window.location.reload();
}

export default function GameWDesc(props: {
  game: GameProps;
  i: number;
}): JSX.Element {
  const [accordion, setAccordion]: [
    boolean,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false as boolean);
  const authContext: {
    user: User | null;
    setUser: (user: User | null) => void;
    username: string | null;
    setUserName: (username: string | null) => void;
    auth: Auth;
    accessed: boolean;
    setAccessed: (acc: boolean) => void;
  } = useContext(AuthUserContext);
  const { game, i } = props;
  const [location]: [
    string | undefined,
    Dispatch<SetStateAction<string | undefined>>
  ] = useState(game.location !== null ? game.location : 'not given');
  const [date]: [
    string | undefined,
    Dispatch<SetStateAction<string | undefined>>
  ] = useState(game.date !== null ? game.date : 'not given');
  return (
    <FramesHolder key={`game${i}`}>
      <span>
        <ProfileLink href={`./profile?=${game.user_id}`}>
          {game.username}
        </ProfileLink>
      </span>
      {game.user_id === authContext.user?.uid ? (
        <DeleteGameButton
          type="button"
          onClick={() => deleteGameLocal(game.id)}
        >
          DELETE GAME
        </DeleteGameButton>
      ) : null}
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
        <Annotation>Location: {location}</Annotation>
        <Annotation>Date: {date}</Annotation>
        <DescText>{game.description}</DescText>
      </Desc>
      <Arrow
        className={game.description || game.location || game.date ? '' : 'none'}
        type="button"
        onClick={() => setAccordion(!accordion)}
      >
        {accordion ? '▲' : 'Read ▼ More'}
      </Arrow>
    </FramesHolder>
  );
}
