import { useState, useContext, Dispatch, SetStateAction } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  Auth,
} from 'firebase/auth';
import styled, { StyledComponent } from 'styled-components';
import { fireBaseAuth } from '../firebase/config';
import { AuthUserContext } from '../contexts/AuthContext';
import { postUser } from '../api/Requests';
import { ErrorMessage, FormHolder, height } from '../constants/Values';

const auth: Auth = fireBaseAuth.getAuth();

const ButtonLink: StyledComponent<'button', any> = styled.button`
  background-color: white;
  cursor: pointer;
  border: 0;
  font-size: ${height / 60}px;
  width: 60%;
  text-align: right;
  font-style: italic;
`;

const FormObject: StyledComponent<'div', any> = styled.div`
  margin-bottom: 1em;
`;

const SimpleInput: StyledComponent<'input', any> = styled.input`
  border: 0;
  border-bottom: 1px solid gray;
  font-size: ${height / 40}px;
`;

const LoginButton: StyledComponent<'button', any> = styled.button`
  border-radius: 10px;
  background-color: steelblue;
  color: white;
  font-size: ${height / 60}px;
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
`;

export default function Login(): JSX.Element {
  const authContext: {
    user: fireBaseAuth.User | null;
    setUser: (user: fireBaseAuth.User | null) => void;
    username: string | null;
    setUserName: (name: string | null) => void;
    auth: Auth;
    accessed: boolean;
    setAccessed: (acc: boolean) => void;
  } = useContext(AuthUserContext);
  const [page, setPage]: [string, Dispatch<SetStateAction<string>>] =
    useState('login');
  const [loginEmail, setLoginEmail]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState('');
  const [loginPassword, setLoginPassword]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState('');
  const [username, setUsername]: [string, Dispatch<SetStateAction<string>>] =
    useState('');
  const [email, setEmail]: [string, Dispatch<SetStateAction<string>>] =
    useState('');
  const [password, setPassword]: [string, Dispatch<SetStateAction<string>>] =
    useState('');
  const [warning, setWarning]: [string, Dispatch<SetStateAction<string>>] =
    useState('');
  const submit = function (): void {
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
        .catch((error) => {
          console.log(error);
          setWarning('Error creating user');
        });
    } catch (error) {
      console.log(error);
      setWarning('Error creating user.');
    }
  };
  const loginSubmit = function (): void {
    try {
      signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((userCredential) => {
          // console.log(userCredential);
          window.location.href = './';
        })
        .catch(() => {
          setWarning('Error logging in user.');
        });
    } catch (error) {
      // console.log(error);
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
          type="password"
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
