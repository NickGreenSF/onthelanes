import { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { User } from 'firebase/auth';
import Homepage from './pages/Homepage';
import Navbar from './components/Navbar';
import CreateGame from './pages/CreateGame';
import Login from './pages/Login';
import { AuthUserContext } from './contexts/AuthContext';
import { fireBaseAuth } from './firebase/config';
import Profile from './pages/Profile';

const auth = fireBaseAuth.getAuth();
console.log(auth);

function App() {
  const [user, setUser] = useState(null as User | null);
  const [username, setUserName] = useState(null as string | null);
  const [accessed, setAccessed] = useState(false as boolean);
  // const authContext = { user, setUser, auth, username, setUserName };
  const authContext = useMemo(
    () => ({
      user,
      setUser,
      auth,
      username,
      setUserName,
      accessed,
      setAccessed,
    }),
    [user, setUser, username, setUserName, accessed, setAccessed]
  );

  useEffect(() => {
    auth.onAuthStateChanged((newUser) => {
      // console.log(newUser);
      setAccessed(true);
      setUser(newUser);
      if (!newUser) {
        setUserName(null);
      } else {
        setUserName(newUser.displayName);
      }
      // console.log(authContext);
    });
  }, []);

  return (
    <div>
      <AuthUserContext.Provider value={authContext}>
        <Navbar />
        <HashRouter>
          <div>
            <Routes>
              <Route path="/creategame" element={<CreateGame />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Homepage />} />
              <Route element={<Homepage />} />
            </Routes>
          </div>
        </HashRouter>
      </AuthUserContext.Provider>
    </div>
  );
}

export default App;
