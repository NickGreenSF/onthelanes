import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserGames } from '../api/Requests';
import { GameProps } from '../types';
import GameWDesc from '../components/GameWDesc';
import { ErrorMessage, GameGrid, width } from '../constants/Values';

const url = document.URL;
// console.log(url.split('/'));

const initBool = true;

const getGames = async () => {
  if (url.split('=').length < 2) {
    return;
  }
  const uid = url.split('=')[1];
  try {
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
    const games: GameProps[] = await getUserGames(uid);
    return games;
  } catch (error) {
    return undefined;
  }
};

const FactSheet = styled.div`
  width: ${width * 0.9 + 20}px;
  margin: auto;
  background-color: white;
  padding: 10px;
  margin-top: 20px;
`;

export default function Profile() {
  const [isLoading, setIsLoading] = useState(initBool);
  const [games, setGames] = useState([] as GameProps[]);
  const [totalGames, setTotalGames] = useState(1);
  const [average, setAverage] = useState(0.0);
  const [username, setUsername] = useState('');
  useEffect(() => {
    getGames().then((res) => {
      setIsLoading(false);
      if (res === undefined || res.length === 0) {
        return;
      }
      setUsername(res[0].username);
      // console.log(res);
      setTotalGames(res.length);
      let totalScore = 0;
      for (let i = 0; i < res.length; i += 1) {
        totalScore += res[i].score;
      }
      setAverage(totalScore / res.length);
      setGames(res);
      // console.log(games);
    });
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);
  if (isLoading) {
    return <div>loading</div>;
  }
  if (games.length === 0) {
    return (
      <ErrorMessage>We couldn't find any games for this user.</ErrorMessage>
    );
  }
  return (
    <div>
      <FactSheet>
        <span style={{ fontWeight: 'bold' }}>{username}</span>
        <span style={{ position: 'absolute', left: width * 0.45 }}>
          Total Games: {totalGames}
        </span>
        <span style={{ position: 'absolute', left: width * 0.8 }}>
          Average: {average.toString().slice(0, 5)}
        </span>
      </FactSheet>
      <GameGrid>
        {games.map((game, i) => (
          <GameWDesc key={i} game={game} i={i} />
        ))}
      </GameGrid>
    </div>
  );
}
