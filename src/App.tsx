import { useState, useEffect } from 'react';
import GameChart from './components/GameChart';
import './App.css'
import { GameProps } from './types';
import { getAllGames, samplePostGame } from "./api/Requests"

const initBool: boolean = false; // typescript defines false as a type

function App() {

  const [loaded, setLoaded] = useState(initBool);
  const [games, setGames] = useState([{score: 0}])

  // You have to define [] here or this will run a zillion times and that's bad.
  useEffect(() => {
    getAllGames().then((data) =>{
      setGames(data.games);
      setLoaded(true);
    })
  }, []);
  if (!loaded){
    return <div>Loading...</div>
  }
  return (
    <GameChart game={games[0]}></GameChart>
  );
}

export default App;
