import { useState, useContext } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import styled from 'styled-components';
import { fireBaseAuth } from '../firebase/config';
import { AuthUserContext } from '../contexts/AuthContext';
import { postUser } from '../api/Requests';
import { ErrorMessage, FormHolder, height } from '../constants/Values';

const auth = fireBaseAuth.getAuth();

const ButtonLink = styled.button`
  background-color: white;
  cursor: pointer;
  border: 0;
  font-size: ${height / 60}px;
  width: 60%;
  text-align: right;
  font-style: italic;
`;

const FormObject = styled.div`
  margin-bottom: 1em;
`;

const SimpleInput = styled.input`
  border: 0;
  border-bottom: 1px solid gray;
  font-size: ${height / 40}px;
`;

const LoginButton = styled.button`
  border-radius: 10px;
  background-color: steelblue;
  color: white;
  font-size: ${height / 60}px;
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
`;

export default function Login() {
  const authContext = useContext(AuthUserContext);
  const [page, setPage] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warning, setWarning] = useState('');
  const submit = function () {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          console.log(authContext.user);
          const firebaseId = userCredential.user.uid;
          updateProfile(userCredential.user, { displayName: username }).then(
            () => {
              postUser({ username, firebase_id: firebaseId }).then((res) => {
                console.log(res);
                window.location.href = './';
              });
            }
          );
        })
        .catch(() => {
          setWarning('Error creating user');
        });
    } catch (error) {
      console.log(error);
      setWarning('Error creating user.');
    }
  };
  const loginSubmit = function () {
    try {
      signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
          console.log(userCredential);
          window.location.href = './';
        })
        .catch(() => {
          setWarning('Error logging in user.');
        });
    } catch (error) {
      console.log(error);
      setWarning('Error logging in user.');
    }
  };

  if (authContext.user !== null) {
    return <ErrorMessage>User already signed in.</ErrorMessage>;
  }
  if (page === 'login') {
    return (
      <FormHolder>
        <FormObject>
          <SimpleInput
            placeholder="Email"
            onChange={(ev) => setLoginEmail(ev.target.value)}
          />
        </FormObject>
        <FormObject>
          <SimpleInput
            type="password"
            placeholder="Password"
            onChange={(ev) => setLoginPassword(ev.target.value)}
          />
        </FormObject>
        <FormObject>
          <LoginButton type="button" onClick={() => loginSubmit()}>
            Login
          </LoginButton>
        </FormObject>
        <FormObject>
          <ButtonLink type="button" onClick={() => setPage('register')}>
            Register <span>here</span>
          </ButtonLink>
        </FormObject>
        <div>{warning}</div>
      </FormHolder>
    );
  }
  return (
    <FormHolder>
      <FormObject>
        <SimpleInput
          placeholder="Username"
          onChange={(ev) => setUsername(ev.target.value)}
        />
      </FormObject>
      <FormObject>
        <SimpleInput
          placeholder="Email"
          onChange={(ev) => setEmail(ev.target.value)}
        />
      </FormObject>
      <FormObject>
        <SimpleInput
          placeholder="Password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
      </FormObject>
      <FormObject>
        <LoginButton type="button" onClick={() => submit()}>
          Register
        </LoginButton>
      </FormObject>
      <FormObject>
        <ButtonLink type="button" onClick={() => setPage('login')}>
          Log in here
        </ButtonLink>
      </FormObject>
      <div>{warning}</div>
    </FormHolder>
  );
}
