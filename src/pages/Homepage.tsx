import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GameProps } from '../types';
import { getAllGames, samplePostGame } from '../api/Requests';
import CountFrame from '../components/CountFrame';
import { TenWide, ScoreBox } from '../constants/Values';

const initBool = false; // typescript defines false as a type

const width: number = window.innerWidth;
const height: number = window.innerHeight;

const NameHolder = styled.div`
  width: ${width / 5}px;
  border: 1px solid black;
  background-color: lightblue;
`;

const FramesHolder = styled.div`
  margin-bottom: ${height / 20}px;
  margin-left: ${width / 10}px;
  margin-right: ${width / 10}px;
`;

function retrieveScore(frames: string) {
  const sepFrames: string[] = frames.split('|');
  const scores: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 9; i += 1) {
    let digitsSought = 0;
    if (sepFrames[i] === 'X') {
      digitsSought = 2;
      scores[i] = 10;
    } else if (sepFrames[i].charAt(1) === '/') {
      digitsSought = 1;
      scores[i] = 10;
    } else if (sepFrames[i].charAt(1) === '-') {
      scores[i] = parseInt(sepFrames[i].charAt(0));
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
    if (i > 0) {
      scores[i] += scores[i - 1];
    }
  }
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
  scores[9] += scores[8];
  return scores;
}

const startStateArr: GameProps = { score: 0, frames: '' };

function Homepage() {
  const [loaded, setLoaded] = useState(initBool);
  const [games, setGames] = useState([startStateArr]);

  // You have to define [] here or this will run a zillion times and that's bad.
  useEffect(() => {
    getAllGames().then((data) => {
      setGames(data.games);
      setLoaded(true);
    });
  }, []);
  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {games.map((game) => (
        <FramesHolder>
          <NameHolder>N</NameHolder>
          <div>
            <TenWide>
              {game.frames.split('|').map((frame) => (
                <CountFrame frameText={frame} />
              ))}
            </TenWide>
            <TenWide>
              {retrieveScore(game.frames).map((score) => (
                <ScoreBox>{score}</ScoreBox>
              ))}
            </TenWide>
          </div>
        </FramesHolder>
      ))}
    </div>
  );
}

export default Homepage;
