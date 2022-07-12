import { User } from 'firebase/auth';
import { createContext } from 'react';
import { fireBaseAuth } from '../firebase/config';

const auth = fireBaseAuth.getAuth();

export const AuthUserContext = createContext({
  user: null as User | null,
  setUser: (user: User | null) => {},
  username: null as string | null,
  setUserName: (username: string | null) => {},
  auth,
  accessed: false as boolean,
  setAccessed: (acc: boolean) => {},
});
