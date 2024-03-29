import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styled, { StyledComponent } from 'styled-components';
import { GameProps } from '../types';
import { getAllGames } from '../api/Requests';
import GameWDesc from '../components/GameWDesc';
import {
  ErrorMessage,
  GameGrid,
  height,
  width,
  mobile,
} from '../constants/Values';

const SearchInput: StyledComponent<'input', any> = styled.input`
  width: ${mobile ? width * 0.8 : width * 0.3}px;
  margin-left: ${mobile ? width * 0.075 : width * 0.35}px;
  margin-top: 1em;
  font-size: ${height / 40}px;
`;

function Homepage(): JSX.Element {
  const [loaded, setLoaded]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false as boolean);
  const [games, setGames]: [
    GameProps[],
    Dispatch<SetStateAction<GameProps[]>>
  ] = useState([] as GameProps[]);
  const [initGames, setInitGames]: [
    GameProps[],
    Dispatch<SetStateAction<GameProps[]>>
  ] = useState([] as GameProps[]);

  useEffect(() => {
    getAllGames().then((data) => {
      setGames(data.games.reverse());
      setInitGames(data.games);
      setLoaded(true);
    });
  }, []);

  // this method is not well implemented.
  function handleSearch(k: string): void {
    const key: string = k.toLowerCase();
    const newGames: GameProps[] = [] as GameProps[];
    for (let i = 0; i < initGames.length; i += 1) {
      if (initGames[i].username.toLowerCase().includes(key)) {
        newGames.push(initGames[i]);
      }
    }
    setGames(newGames);
  }

  if (!loaded) {
    return <ErrorMessage>Loading...</ErrorMessage>;
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
