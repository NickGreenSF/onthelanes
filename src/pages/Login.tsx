import { useState, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import styled from 'styled-components';
import { fireBaseAuth } from '../firebase/config';
import { AuthUserContext } from '../contexts/AuthContext';
import { postUser } from '../api/Requests';
import { FormHolder } from '../constants/Values';

const auth = fireBaseAuth.getAuth();

const ButtonLink = styled.button`
  background-color: white;
  cursor: pointer;
  border: 0;
`;

const FormObject = styled.div`
  margin-bottom: 1em;
`

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
      <FormHolder>
        <FormObject>
          <input onChange={(ev) => setLoginEmail(ev.target.value)} />
        </FormObject>
        <FormObject>
          <input onChange={(ev) => setLoginPassword(ev.target.value)} />
        </FormObject>
        <FormObject>
          <button type="button" onClick={loginSubmit}>
            Login
          </button>
        </FormObject>
        <FormObject>
          <ButtonLink type="button" onClick={() => setPage('register')}>
            Register here
          </ButtonLink>
        </FormObject>
      </FormHolder>
    );
  }
  return (
    <FormHolder>
      <div>
        <input onChange={(ev) => setUsername(ev.target.value)} />
      </div>
      <div>
        <input onChange={(ev) => setEmail(ev.target.value)} />
      </div>
      <div>
        <input onChange={(ev) => setPassword(ev.target.value)} />
      </div>
      <div>
        <button type="button" onClick={submit}>
          Register
        </button>
      </div>
      <div>
        <ButtonLink type="button" onClick={() => setPage('login')}>
          Log in here
        </ButtonLink>
      </div>
    </FormHolder>
  );
}
