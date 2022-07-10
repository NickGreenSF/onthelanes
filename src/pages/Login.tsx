import { useState, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { fireBaseAuth } from '../firebase/config';
import { AuthUserContext } from '../contexts/AuthContext';
import { postUser } from '../api/Requests';

const auth = fireBaseAuth.getAuth();

export default function Login() {
  const authContext = useContext(AuthUserContext);
  const [page, setPage] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = function () {
    try {
      createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          console.log(userCredential);
          console.log(authContext.user);
          const firebaseId = userCredential.user.uid;
          postUser({ username, firebase_id: firebaseId }).then((res) => {
            console.log(res);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const loginSubmit = function () {
    try {
      signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
        (userCredential) => {
          console.log(userCredential);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (authContext.user !== null) {
    return <div>User already signed in.</div>;
  }
  if (page === 'login') {
    return (
      <div>
        <input onChange={(ev) => setLoginEmail(ev.target.value)} />
        <input onChange={(ev) => setLoginPassword(ev.target.value)} />
        <button type="button" onClick={loginSubmit}>
          Login
        </button>
        <button type="button" onClick={() => setPage('register')}>
          Register here
        </button>
      </div>
    );
  }
  return (
    <div>
      <input onChange={(ev) => setUsername(ev.target.value)} />
      <input onChange={(ev) => setEmail(ev.target.value)} />
      <input onChange={(ev) => setPassword(ev.target.value)} />
      <button type="button" onClick={submit}>
        Register
      </button>
      <button type="button" onClick={() => setPage('login')}>
        Log in here
      </button>
    </div>
  );
}
