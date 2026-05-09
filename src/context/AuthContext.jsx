import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ LOAD USER FROM LOCALSTORAGE ON MOUNT
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");

      if (token && userStr) {
        const userData = JSON.parse(userStr);
        console.log("Auth Context - Loaded user:", userData);
        setUser(userData);
      }
    } catch (error) {
      console.error("Error loading user:", error);
      localStorage.clear();
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ LOGIN FUNCTION
  const login = (data) => {
    try {
      // Save to localStorage
      localStorage.setItem("token", data.token);
      
      const normalizedUser = {
        ...data.user,
        role: data.user.role.replace("ROLE_", ""),
      };
      
      localStorage.setItem("user", JSON.stringify(normalizedUser));
      
      // Update state (triggers re-render)
      setUser(normalizedUser);
      
      console.log("Auth Context - User logged in:", normalizedUser);
      
      return normalizedUser;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    console.log("Auth Context - User logged out");
  };

  // ✅ GET TOKEN
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const value = {
    user,
    login,
    logout,
    getToken,
    isAuthenticated: !!user,
    isHR: user?.role === "HR",
    isCandidate: user?.role === "CANDIDATE",
  };

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ CUSTOM HOOK TO USE AUTH
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};