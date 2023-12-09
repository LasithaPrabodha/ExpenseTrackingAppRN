import {User, onAuthStateChanged} from 'firebase/auth';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {auth} from '../database/config'; 

interface Props {
  children?: ReactNode;
}

const AuthContext = createContext<User | null | undefined>({} as User);

export const AuthProvider = ({children}: Props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, user => {
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default function useAuth() {
  return useContext(AuthContext);
}
