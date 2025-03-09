import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to homepage after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        ClauseBot AI
      </Link>
      <div>
        <Link to="/features" className="mr-4">Features</Link>
        <Link to="/pricing" className="mr-4">Pricing</Link>
        {user ? (
          <>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
