export const saveUser = (data) => {
  try {
    // ✅ SAVE TOKEN
    localStorage.setItem("token", data.token);

    const user = data.user;

    // ✅ NORMALIZE ROLE (remove ROLE_ prefix if exists)
    const normalizedUser = {
      ...user,
      role: user.role.replace("ROLE_", ""),
    };

    // ✅ SAVE USER DATA
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    console.log("User saved to localStorage:", normalizedUser);

    return normalizedUser;
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};

export const getUser = () => {
  try {
    const userStr = localStorage.getItem("user");
    
    if (!userStr) {
      return null;
    }

    const user = JSON.parse(userStr);
    console.log("Retrieved user from localStorage:", user);
    
    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    localStorage.clear();
    return null;
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  console.log("User logged out");
};