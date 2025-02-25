// contexts/AuthContext.js
"use client";
import { createContext, useEffect, useState, useContext } from "react";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const userRef = doc(db, "users", authUser.uid);
        try {
          const userSnap = await getDoc(userRef);
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName || "User",
            ...(userSnap.exists() ? userSnap.data() : {}), // Only add data if doc exists
          });
        } catch (error) {
          console.error("Error fetching user data:", error.message);
          // Fallback to basic auth data if Firestore fetch fails
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName || "User",
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);