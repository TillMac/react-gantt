import { createContext, ReactNode, useState } from "react";
import { z } from 'zod';

type Props = {
  children?: ReactNode;
}

const IAuthContextSchema = z.object({
  authenticated: z.object({
    isGuest: z.boolean(),
    isAuthenticated: z.boolean(),
    accessToken: z.string(),
  }),
  setAuthenticated: z.function().args(z.object({
    isGuest: z.boolean(),
    isAuthenticated: z.boolean(),
    accessToken: z.string(),
  })).returns(z.void()),
});

type IAuthContext = z.infer<typeof IAuthContextSchema>;

const initialValue = {
  isGuest: false,
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
