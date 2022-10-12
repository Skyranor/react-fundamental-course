import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { useContext } from 'react';
import { privateRoutes, publicRoutes } from '../router';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';
const AppRouter = () => {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      {isAuth ? (
        <Route path="" element={<Layout />}>
          {privateRoutes.map((route) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
            />
          ))}
        </Route>
      ) : (
        <>
          {publicRoutes.map((route) => (
            <Route path={route.path} element={route.component} key={route} />
          ))}
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
