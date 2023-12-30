import { initializeApp } from "firebase/app";
import { Auth, User, getAuth, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyBpRpCDq5By8KaOULZ5MYw2lwFMGFJBa_4",
  authDomain: "flowchain.firebaseapp.com",
  projectId: "flowchain",
  storageBucket: "flowchain.appspot.com",
  messagingSenderId: "1001652556564",
  appId: "1:1001652556564:web:0b845b81101702e92e6801",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseContext = createContext<{
  user: User | null;
  auth: Auth;
}>({
  user: null,
  auth,
});

export const FirebaseProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  return (
    <FirebaseContext.Provider value={{ user, auth }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
