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
  isLoading: boolean;
  setIsAuthenticated: (value: boolean) => void;
  logout: () => void;
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
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add this

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axiosInstance.get(`${API_URL}/user/verify-token`);
        setIsAuthenticated(true);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyToken();
  }, [isAuthenticated]);

  const logout = async () => {
    try {
      await axiosInstance.get(`${API_URL}/user/logout`);
    } catch (error) {
      console.error("Logout failed:", error); // Log the error for debugging
    } finally {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//exporting this hook so we can use it in other components to access the context value

export default AuthProvider;
