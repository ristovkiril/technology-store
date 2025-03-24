import {createContext, useContext, useEffect, useState} from "react";
import {GoogleAuthProvider, onAuthStateChanged} from "firebase/auth"
import {auth, db} from "@/firebase"
import {LoadingScreen} from "../shared/ui/loading/loading-screen.jsx";
import {doc, getDoc, setDoc, updateDoc} from "firebase/firestore";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, updateProfile, signOut, sendPasswordResetEmail} from "firebase/auth";
import {useSetAtom} from "jotai";
import {NotificationModalAtom} from "@/modals/atoms.js";

const AuthContext = createContext({
  isAuth: null,
  user: null,
  handleLogout: () => {},
  handleRegister: () => {},
  handleLogin: () => {},
  handleLoginGoogle: () => {},
  handleForgotPassword: () => {},
  handleUpdateUser: () => {},
})

export const AuthContextProvider = ({children}) => {
  const setNotificationModal = useSetAtom(NotificationModalAtom);
  const [isAuth, setIsAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsAuth(!!user);
    });
    return () => unsubscribe();
  }, [])

  useEffect(() => {
    if (isAuth) {
      fetchUser();
    }
  }, [isAuth])

  const fetchUser = async () => {
    if (auth?.currentUser?.uid) {
      try {
        const docRef = doc(db, "users", auth?.currentUser?.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap?.exists()) {
          const userDetails = {...docSnap?.data()};
          setUser(userDetails || null);
          setNotificationModal(true);
        } else {
          const userDetails = {
            uid: auth?.currentUser?.uid,
            displayName: auth.currentUser?.displayName,
            email: auth?.currentUser?.email,
            photoURL: auth?.currentUser?.photoURL,
            dateCreated: new Date().getTime()
          }
          await setDoc(doc(db, "users", auth.currentUser.uid), userDetails);
          setUser(userDetails || null);
          setNotificationModal(true);
        }
      } catch (error) {
        console.log(error);
        setIsAuth(false);
      }
    }
  }

  const handleLogout = async () => {
    await signOut(auth);
    setIsAuth(false);
    setUser(null);
  }

  const handleLogin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  }

  const handleForgotPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  }

  const handleRegister = async (email, password, fullName) => {
    await createUserWithEmailAndPassword(auth, email, password);
    if (auth?.currentUser) {
      await updateProfile(auth.currentUser, {fullName})
      await createUser({email, fullName})
    }
  }

  const handleLoginGoogle = async () => {
    console.log("login google");
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  const createUser = async ({fullName, email}) => {
    await setDoc(doc(db, "users", auth.currentUser.uid),
      {
        uid: auth?.currentUser?.uid,
        displayName: fullName || auth.currentUser?.displayName,
        email: email,
        photoURL: auth?.currentUser?.photoURL,
        dateCreated: new Date().getTime()
      });
  }

  const handleUpdateUser = async (updateData) => {
    if (!auth?.currentUser?.uid) {
      return;
    }
    if (updateData?.displayName || updateData?.photoURL) {
      await updateProfile(auth?.currentUser, {...updateData});
    }
    const userRef = doc(db, "users", auth?.currentUser?.uid);
    await updateDoc(userRef, {...updateData});
    setUser(prev => ({...prev, ...updateData}));
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        user,
        handleLogout,
        handleRegister,
        handleLogin,
        handleLoginGoogle,
        handleForgotPassword,
        handleUpdateUser,
      }}
    >
      {isAuth === null ? <LoadingScreen/> : children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);