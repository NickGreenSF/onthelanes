import { useState, useEffect } from 'react';
import { GameProps } from '../types';
import { getAllGames } from '../api/Requests';
import GameWDesc from '../components/GameWDesc';
import { GameGrid } from '../constants/Values';

const startStateArr: GameProps = {
  score: 0,
  frames: '',
  username: '',
  id: 0,
  user_id: '0',
};

function Homepage() {
  const [loaded, setLoaded] = useState(false as boolean);
  const [games, setGames] = useState([startStateArr]);

  // You have to define [] here or this will run a zillion times and that's bad.
  useEffect(() => {
    getAllGames().then((data) => {
      setGames(data.games.reverse());
      setLoaded(true);
    });
  }, []);
  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
    <GameGrid>
      {games.map((game, i) => (
        <GameWDesc key={i} game={game} i={i} />
      ))}
    </GameGrid>
  );
}

export default Homepage;
