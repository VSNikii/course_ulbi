import { Route, Routes } from 'react-router';
import { Posts } from '../pages/Posts/Posts';
import { publicRoutes, privateRoutes } from '../router/route';
import { Login } from '../pages/Login/Login';
import { useContext } from 'react';
import { AuthContext } from '../context';
import { Loader } from './UI/loader/Loader';


export function AppRouter() {
  const {isAuth, isAuthLoading} = useContext(AuthContext);
  

  if(isAuthLoading){
    return <Loader/>
  }

  return (
    <>
      {isAuth ? (
        <Routes>
          {privateRoutes.map((route) => {
            return (
              <Route
                path={route.path}
                element={route.component}
                exact={route.exact}
                key={route.path}
              />
            );
          })}
          <Route path="*" element={<Posts />} />
        </Routes>
      ) : (
        <Routes>
          {publicRoutes.map((route) => {
            return (
              <Route
                path={route.path}
                element={route.component}
                exact={route.exact}
                key={route.path}
              />
            );
          })}
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </>
  );
}
