import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "@/firebase";

type Props = {
  children?: ReactNode;
}

type AuthContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: any;
  isAnonymous: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  logout: any;
  // 你可以在此添加其他的函數或狀態型別，例如 login 或 logout 函數
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider!');
  }
  return context;
};

const AuthProvider = ({children}: Props) => {
  const [currentUser, setCurrentUser] = useState<unknown>(null);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    })
  
    return () => {
      unsubscribe();
    }
  }, []);

  useEffect(() => {
    const user = auth.currentUser;
    if (user?.isAnonymous) {
      setIsAnonymous(true);
    } else {
      setIsAnonymous(false);
    }
  }, [currentUser])

  const logout = async() => {
    setCurrentUser(null);
    await auth.signOut();
  }

  const value = {
    currentUser,
    isAnonymous,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )  
}

export { AuthContext, AuthProvider };
