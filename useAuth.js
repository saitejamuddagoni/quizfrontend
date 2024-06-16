import { useState, useEffect } from 'react';


function getUserRole() {
  const token = localStorage.getItem('authToken');

  if (token) {
    try {
      const decodedToken = jwt_decode(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log('Token is expired');
        return null;
      }

      return decodedToken.role;
    } catch (error) {
      console.log('Error decoding token:', error);
      return null;
    }
  }
  return null;
}

export default function useAuth() {
  const [userRole, setUserRole] = useState(getUserRole());
  const [token, setToken] = useState(localStorage.getItem("authToken"));

      const intervalId = setInterval(() => {
      const newToken = localStorage.getItem("authToken");
      if (newToken !== token) {
        setToken(newToken);
        setUserRole(getUserRole());
      }
    }, 1000);

   
  return userRole;
}
