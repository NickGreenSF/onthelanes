import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { fireBaseAuth } from '../firebase/config';

const auth = fireBaseAuth.getAuth();

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = function () {
    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log(userCredential);
      }
    );
  };
  return (
    <div>
      <input onChange={(ev) => setUsername(ev.target.value)} />
      <input onChange={(ev) => setEmail(ev.target.value)} />
      <input onChange={(ev) => setPassword(ev.target.value)} />
      <button type="button" onClick={submit}>
        Register
      </button>
    </div>
  );
}
