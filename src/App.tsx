import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import CreateGame from './pages/CreateGame';

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/creategame" element={<CreateGame />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
