import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // will hold { username, identifier } or null
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/auth", {
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
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier access
export const useUser = () => useContext(UserContext);
