import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthContext } from './context';
import './App.css';

import { NavBar } from './components/UI/NavBar/NavBar';

import { AppRouter } from './components/AppRouter';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('auth')){
      setIsAuth(true);
    }
    setIsAuthLoading(false);
  }, []);
  return (
    <>
      <AuthContext.Provider value={{
        isAuth, 
        setIsAuth,
        isAuthLoading
      }}>
        <BrowserRouter>
          <NavBar/>
          <AppRouter />
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
