import { createContext, useState } from "react";
import { ChildrenType } from "../types/children";
import { AuthContextTypes } from "../types/auth-context";
import { TOKEN } from "../constants";

// export const AuthContext = createContext<AuthContextTypes | null>(null);
export const AuthContext = createContext({} as AuthContextTypes);

const AuthContextProvider = ({ children }: ChildrenType) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem(TOKEN))
  );

  const state = { isAuthenticated, setIsAuthenticated };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
