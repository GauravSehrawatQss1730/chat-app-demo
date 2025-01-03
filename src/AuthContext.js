import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from './services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null indicates "loading"
  const [user, setUser] = useState(null); // null indicates "
  const navigate = useNavigate();


  useEffect( () => {
    const fetchUserDetails = async () =>{
      try{
        const {data} = await getUserProfile();
        console.log(data)
        setUser(data)
  
      }catch(e){
        console.log(e)
        if(e.response.status === 401) {
          navigate('/login')
        }
        setIsAuthenticated(false)
      }
    }
    fetchUserDetails()
    setIsAuthenticated(true)
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
    navigate('/'); 
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login'); // Redirect to login after logout
  };

  if (isAuthenticated === null) {
    // Show a loading spinner or nothing while checking auth status
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
