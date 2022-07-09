import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { User } from 'firebase/auth';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import CreateGame from './pages/CreateGame';
import Login from './pages/Login';
import { AuthUserContext } from './contexts/AuthContext';
import { fireBaseAuth } from './firebase/config';

const auth = fireBaseAuth.getAuth();

function App() {
  const [user, setUser] = useState(null as User | null);
  const [username, setUserName] = useState(null as string | null);
  // const authContext = { user, setUser, auth, username, setUserName };
  const authContext = useMemo(
    () => ({ user, setUser, auth, username, setUserName }),
    [user, setUser, username, setUserName]
  );

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      // console.log(newUser);
      setUser(newUser);
      if (!newUser) {
        setUserName(null);
      } else {
        setUserName(newUser.email);
      }
      // console.log(authContext);
    });
  }, []);

  return (
    <div>
      <AuthUserContext.Provider value={authContext}>
        <Navbar />
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/creategame" element={<CreateGame />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthUserContext.Provider>
    </div>
  );
}

export default App;
