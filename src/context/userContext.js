import { createContext, useContext, useState } from "react";
import { 
    onAuthStateChanged, 
    signOut, 
    signInWithPopup, 
    GithubAuthProvider 
} from "firebase/auth";
import { auth  } from "../config/firebase"

export const UserContext = createContext({});

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useState(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      } else {
        localStorage.removeItem('token');
        setUser(null);
      }
      setError("");
      setLoading(false);
    });
    return unsubscribe;
  }, []);



  const signInWithGithub = () => {
    setLoading(true);
    setError("");

    signInWithPopup(
      auth, 
      new GithubAuthProvider()
      .addScope('public_repo, user'))
        .then((res) => {
          localStorage.setItem('token', res._tokenResponse.oauthAccessToken);
          setUser(res);
        })
        .catch((err) => {
          setError(err.code);
        })
        .finally(() => setLoading(false));    
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    signOut(auth);
  };

  const contextValue = {
    user,
    loading,
    error,
    logoutUser,
    signInWithGithub,
  };
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}