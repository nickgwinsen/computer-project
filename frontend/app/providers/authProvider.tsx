import axiosInstance from "@/config/axios";
import { API_URL } from "@/config/constants";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// This defines what shape and type the context value will have, in this case, it will have a token property which is a string or null.
interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await axiosInstance.get(`${API_URL}/verify-token`);
        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

//exporting this hook so we can use it in other components to access the context value

export default AuthProvider;
