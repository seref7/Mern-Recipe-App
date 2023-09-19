import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  // Retrieve cookies and set the navigate function
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  // Function to handle logout
  const logout = () => {
      // Clear the access token cookie and local storage
      setCookies("access_token", "");
      window.localStorage.clear();
      // Navigate to the authentication page
      navigate("/auth");
  };

    return (
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/create-recipe">Create Recipe</Link>
          
          {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <>
        <Link to="/saved-recipes">Saved Recipes</Link>
        <button onClick={logout}> Logout </button>
        </>
        )}
        </div>
      );
    };