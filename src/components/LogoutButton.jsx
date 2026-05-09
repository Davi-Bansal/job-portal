import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(); // ✅ THIS TRIGGERS RE-RENDER
    navigate("/login", { replace: true });
  };

  return (
    <button onClick={handleLogout} className="btn logout">
      Logout
    </button>
  );
}