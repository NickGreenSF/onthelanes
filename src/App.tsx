import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import CreateGame from './pages/CreateGame';
import Register from './pages/Register';
import { fireBaseAuth } from './firebase/config';

const auth = fireBaseAuth.getAuth();

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/creategame" element={<CreateGame />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
