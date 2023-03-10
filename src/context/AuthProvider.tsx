import { createContext, useState } from "react";

// const AuthContext = createContext({});
const AuthContext = createContext({
  auth: {},
  setAuth: (auth: any) => {},
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
