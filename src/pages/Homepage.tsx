import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GameProps } from '../types';
import { getAllGames } from '../api/Requests';
import GameWDesc from '../components/GameWDesc';

const initBool = false; // typescript defines false as a type

const startStateArr: GameProps = {
  score: 0,
  frames: '',
  username: '',
  id: 0,
  user_id: '0',
};

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

function Homepage() {
  const [loaded, setLoaded] = useState(initBool);
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
