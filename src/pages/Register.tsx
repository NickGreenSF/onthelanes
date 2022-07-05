import { useState, useContext } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { fireBaseAuth } from '../firebase/config';
import { AuthUserContext } from '../contexts/AuthContext';
import { postUser } from '../api/Requests';

const auth = fireBaseAuth.getAuth();

export default function Register() {
  const authContext = useContext(AuthUserContext);
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
