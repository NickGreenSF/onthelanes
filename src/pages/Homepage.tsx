import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GameProps } from '../types';
import { getAllGames } from '../api/Requests';
import GameWDesc from '../components/GameWDesc';

const initBool = false; // typescript defines false as a type

const startStateArr: GameProps = { score: 0, frames: '', username: '' };

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
      {games.map((game, i) => (
        <GameWDesc game={game} i={i} />
      ))}
    </div>
  );
}

export default Homepage;
