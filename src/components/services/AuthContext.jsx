import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  updateEmail,
} from "firebase/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Google Sign-In
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Sign up with Email and Password
  const registerWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with Email and Password
  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout function
  const logOut = () => {
    return signOut(auth);
  };


// Update user profile
const updateUserProfile = async (displayName, photoURL) => {
    if (user) {
      return updateProfile(user, { displayName, photoURL }); // This will save the display name and photo URL
    } else {
      throw new Error("No user is currently logged in.");
    }
  };
  
  // Update user email
  const updateUserEmail = async (newEmail) => {
    if (user) {
      return updateEmail(user, newEmail);
    } else {
      throw new Error("No user is currently logged in.");
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User:", currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        registerWithEmail,
        loginWithEmail,
        user,
        updateUserProfile,
        updateUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
