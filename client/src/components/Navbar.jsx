import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/logout";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center shadow-md">
      <Link to="/" className="font-bold text-lg">
        ChandraVivah
      </Link>

      <div className="space-x-4">
        <Link to="/">Home</Link>

        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/create">Create Post</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}

            <button
              onClick={() => logout(navigate)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}

        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
