import { createContext, ReactNode, useState } from "react";

type Props = {
  children?: ReactNode;
}

type IAuthContext = {
  authenticated: {
    isAuthenticated: boolean;
    accessToken: string;
  };
  setAuthenticated: (newState: {
    isAuthenticated: boolean;
    accessToken: string;
  }) => void;
};

const initialValue = {
  isAuthenticated: false,
  accessToken: '',
};

const AuthContext = createContext<IAuthContext>({
  authenticated: initialValue,
  setAuthenticated: () => {}
});

const AuthProvider = ({children}: Props) => {
  const [ authenticated, setAuthenticated ] = useState(initialValue);

  return (
    <AuthContext.Provider value={{authenticated, setAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )  
}

export { AuthContext, AuthProvider };
