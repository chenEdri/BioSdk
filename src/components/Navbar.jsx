import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../hooks/useSession";
import { ROUTES } from "../config/constants";

export default function Navbar() {
  const { isLoggedIn, iam, logout } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to={ROUTES.HOME}>Bio App</Link>
      </div>
      <div className="nav-links">
        <Link to={ROUTES.HOME}>Home</Link>
        {isLoggedIn ? (
          <>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
            <Link to={ROUTES.PAYMENT}>Payment</Link>
            <span className="nav-user">({iam})</span>
            <button onClick={handleLogout} className="nav-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to={ROUTES.LOGIN}>Login</Link>
        )}
      </div>
    </nav>
  );
}