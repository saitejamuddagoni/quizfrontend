import {  useEffect,useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api";
import jwtDecode from "jwt-decode";
import jwt_decode from "jwt-decode"
import { useNavigate,Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function NavBar(props) {
  const [coins, setCoins] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();
  const token = localStorage.getItem("authToken")

  function handleSignIn(){
    navigate("/login")
  }

  function handleSignOut() {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    props.setRole("null")
    navigate("/login");
  }
  
  
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      const email = decoded.email;


      api
        .post(`/api/payments/getcoins`, { email: email })
        .then((response) => {
          setCoins(response.data.coins);
          console.log(response.data.coins);
        })
        .catch((error) => {
          console.log(error);
        });

      const updateAuthStatus = () => {
        setIsAuthenticated(true);
      };

      updateAuthStatus();
      window.addEventListener("storage", updateAuthStatus);

      return () => {
        window.removeEventListener("storage", updateAuthStatus);
      };
    }
  }, [token]);

  return (
    <nav className="bg-blue-600 w-full fixed top-0 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-left">
          {props.role==="student" && <Link to="/shome" className="text-white mr-4">Quiz Mart</Link>}
          {props.role==="teacher" && <Link to="/thome" className="text-white mr-4">Quiz Mart</Link>}

        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-end">
          {props.role==="student" &&   <Link to="/your-tests" className="text-white mr-4">Your Tests</Link>}
          {props.role==="teacher" &&   <Link to="/thome" className="text-white mr-4">Your Creations</Link>}

        </div>
        <div className="flex items-center">
          {(props.role==="student" || props.role==="teacher") && <span className="text-white mr-4">{coins} Coins</span>}
          {!props.role && location.pathname !== "/login" ? (<button className="text-white mr-4" onClick={handleSignIn}>
              Sign In
            </button>
       ) : null}
          {props.role ? (
            <button onClick={handleSignOut} className="text-white">
              Sign Out
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

function getUserRole() {
  const token = localStorage.getItem("authToken");

  if (token) {
    try {
      const decodedToken = jwt_decode(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log("Token is expired");
        return null;
      }

      return decodedToken.role;
    } catch (error) {
      console.log("Error decoding token:", error);
      return null;
    }
  } return null }