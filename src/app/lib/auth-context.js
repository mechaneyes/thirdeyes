import { createContext, useState, useContext } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authInfo, setAuthInfo] = useState(null);

  return (
    <AuthContext.Provider value={{ authInfo, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
