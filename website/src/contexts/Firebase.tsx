import { initializeApp } from "firebase/app";
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithRedirect,
} from "firebase/auth";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import { useNotification } from "./Notification";

const firebaseConfig = {
  apiKey: "AIzaSyB7eWllq447CgnKf5C4zne83h2L0dGB5Aw",
  authDomain: "flowchain.firebaseapp.com",
  projectId: "flowchain",
  storageBucket: "flowchain.appspot.com",
  messagingSenderId: "1001652556564",
  appId: "1:1001652556564:web:fe20a35b88ede8952e6801",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const FirebaseContext = createContext({
  loading: true,
  user: null as User | null,
  continueWithGoogle: () => {},
  continueWithGitHub: () => {},
  continueWithEmailAndPassword: (email: string, password: string) => {},
});

interface FirebaseProviderProps {
  children: React.ReactNode;
}

const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { setError } = useNotification();
  const notifyFirebaseError = (errorCode: string) => {
    switch (errorCode) {
      case "auth/invalid-email":
        setError("Please provide a valid email address.");
        break;
      case "auth/missing-password":
        setError("Please provide a password.");
        break;
      case "auth/weak-password":
        setError("Please provide a stronger password.");
        break;
      case "auth/invalid-login-credentials":
        setError("Please provide valid login credentials.");
        break;
      default:
        setError(
          `Something went wrong. Please try again later.\nErrorCode: ${errorCode}`,
        );
        break;
    }
  };
  const continueWithGoogle = () => {
    signInWithRedirect(auth, googleProvider);
  };
  const continueWithGitHub = () => {
    signInWithRedirect(auth, githubProvider);
  };
  const continueWithEmailAndPassword = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                setUser(userCredential.user);
              })
              .catch((error) => {
                switch (error.code) {
                  default:
                    notifyFirebaseError(error.code);
                }
              });
            break;
          default:
            notifyFirebaseError(error.code);
        }
      });
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        loading,
        user,
        continueWithGoogle,
        continueWithGitHub,
        continueWithEmailAndPassword,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

const useFirebase = () => useContext(FirebaseContext);

export { FirebaseProvider, useFirebase };
