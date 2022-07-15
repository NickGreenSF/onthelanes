import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GameProps } from '../types';
import { getAllGames } from '../api/Requests';
import GameWDesc from '../components/GameWDesc';
import { GameGrid, height, width } from '../constants/Values';

const SearchInput = styled.input`
  width: ${width * 0.3}px;
  margin-left: ${width * 0.35}px;
  margin-top: 1em;
  font-size: ${height / 40}px;
`;

function Homepage() {
  const [loaded, setLoaded] = useState(false as boolean);
  const [games, setGames] = useState([] as GameProps[]);
  const [initGames, setInitGames] = useState([] as GameProps[]);

  // You have to define [] here or this will run a zillion times and that's bad.
  useEffect(() => {
    getAllGames().then((data) => {
      setGames(data.games.reverse());
      setInitGames(data.games);
      setLoaded(true);
    });
  }, []);

  // this method is not well implemented.
  function handleSearch(k: string) {
    const key = k.toLowerCase();
    const newGames = [];
    for (let i = 0; i < initGames.length; i += 1) {
      if (initGames[i].username.toLowerCase().includes(key)) {
        newGames.push(initGames[i]);
        console.log(newGames);
      }
    }
    setGames(newGames);
  }

  if (!loaded) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <SearchInput
        placeholder="Search for bowler..."
        onChange={(ev) => handleSearch(ev.target.value)}
      />
      <GameGrid>
        {games.map((game, i) => (
          <GameWDesc key={i} game={game} i={i} />
        ))}
      </GameGrid>
    </div>
  );
}

export default Homepage;
