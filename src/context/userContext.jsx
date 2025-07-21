import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate=useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null); // will hold { username, identifier } or null
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.REACT_APP_BASE_URL;
  // Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/auth`, {
          withCredentials: true, // ✅ includes HttpOnly cookie
        });

        setUser(res.data); // ✅ axios auto-parses JSON
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [location.pathname]);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier access
export const useUser = () => useContext(UserContext);
