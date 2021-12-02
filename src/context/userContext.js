import { createContext, useContext, useState } from "react";
import { 
    // onAuthStateChanged, 
    signOut, 
    signInWithPopup, 
    GithubAuthProvider 
} from "firebase/auth";
import { auth  } from "../firebase"

export const UserContext = createContext({});

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
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