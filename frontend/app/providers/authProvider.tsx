import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  //useMemo is a hook that returns a memoized value
  // In the context of this hook, a memoized value is a value that is stored in memory and only recalculated when the dependencies change.
  useMemo,
  useState,
} from "react";

// This defines what shape and type the context value will have, in this case, it will have a token property which is a string or null.
interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
}

//the angle bracket notation is a way to pass types as arguments (generic type). We are passing undefined because we don't know the value of the context yet.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setAuthToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // for updating the token when we are outside of the provider
  const setToken = (newToken: string) => {
    setAuthToken(newToken);
  };

  // for setting the default authorization header in axios and storing the token value in local storage
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  //creating memoized value
  //this is used to avoid re-rendering of the context value
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

//exporting this hook so we can use it in other components to access the context value
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
