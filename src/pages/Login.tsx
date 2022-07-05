import { useState, createContext } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { fireBaseAuth } from '../firebase/config';

const auth = fireBaseAuth.getAuth();

export default function Login() {
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
      auth.signOut().then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log(error);
    }
  };

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
