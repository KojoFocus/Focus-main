import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Product } from "../types"; // if not already imported

interface LogoutPageProps {
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const LogoutPage = ({ setCart }: LogoutPageProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setCart([]); // Clear cart on logout
      localStorage.removeItem("focus_cart"); // Optional
      navigate("/login");
    });
  }, [navigate, setCart]);

  return null;
};

export default LogoutPage;
