import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authUser, loading } from "../../atoms/firebaseAuthAtom";
import { useRecoilState } from "recoil";
import { auth } from "../../firebase";
const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [user, setUser] = useRecoilState(authUser);
  const [load, setLoad] = useRecoilState(loading);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setUser(null);
      setLoad(false);
      return;
    }
    setLoad(true);
    console.log(authState);
    var formattedUser = formatAuthUser(authState);
    setUser(formattedUser);
    setLoad(false);
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    user,
    load,
  };
}
