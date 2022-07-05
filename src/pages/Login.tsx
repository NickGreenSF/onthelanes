import { useState, createContext, useContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { fireBaseAuth } from '../firebase/config';
import { AuthUserContext } from '../contexts/AuthContext';

const auth = fireBaseAuth.getAuth();

export default function Login() {
  const authContext = useContext(AuthUserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = function () {
    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          console.log(userCredential);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = function () {
    try {
      auth.signOut().then(() => {
        authContext.setUser(null);
        authContext.setUserName(null);
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (authContext.user !== null) {
    return (
      <div>
        <button type="button" onClick={signOut}>
          signout test
        </button>
      </div>
    );
  }
  return (
    <div>
      <input onChange={(ev) => setEmail(ev.target.value)} />
      <input onChange={(ev) => setPassword(ev.target.value)} />
      <button type="button" onClick={submit}>
        Login
      </button>
      <button type="button" onClick={signOut}>
        signout test
      </button>
    </div>
  );
}
