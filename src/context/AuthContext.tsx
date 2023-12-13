import * as React from "react";

interface AppContextInterface {
  currentUser: any | null;
  isAuthenticated: boolean;
  onLogout: any;
}

const defaultValues: AppContextInterface = {
  currentUser: null,
  isAuthenticated: false,
  onLogout: undefined
};

const AuthContext = React.createContext<AppContextInterface>(defaultValues);
const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;
export { AuthContext, AuthProvider, AuthConsumer };
