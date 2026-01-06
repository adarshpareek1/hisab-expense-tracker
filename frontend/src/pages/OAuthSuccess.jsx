import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // decode minimal user info if needed later
      login({ token, user: {} });
      navigate("/dashboard");
    }
  }, []);

  return <p className="p-8">Logging you in...</p>;
};

export default OAuthSuccess;
