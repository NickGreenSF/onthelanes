import { useEffect } from 'react';
import './App.css'
import { getAllGames } from "./api/Requests"

function App() {
  useEffect(() => {
    getAllGames().then(console.log)
  });
  return (
    <div>
      kek
    </div>
  );
}

export default App;
