import { useEffect, useState } from 'react';
import { getUserGames } from '../api/Requests';
import { GameProps } from '../types';
import GameWDesc from '../components/GameWDesc';
import { ErrorMessage, GameGrid } from '../constants/Values';

const url = document.URL;
console.log(url.split('/'));

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

export default function Profile() {
  const [isLoading, setIsLoading] = useState(initBool);
  const [games, setGames] = useState([] as GameProps[]);
  useEffect(() => {
    getGames().then((res) => {
      setIsLoading(false);
      if (res === undefined) {
        return;
      }
      console.log(res);
      setGames(res);
      console.log(games);
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
    <GameGrid>
      {games.map((game, i) => (
        <GameWDesc key={i} game={game} i={i} />
      ))}
    </GameGrid>
  );
}
