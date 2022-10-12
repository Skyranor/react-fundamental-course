import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../context';
import MyButton from './UI/button/MyButton';

const setActive = ({ isActive }) =>
  isActive ? 'navbar__link active' : 'navbar__link';

const Layout = () => {
  const { setIsAuth } = useContext(AuthContext);
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar__links">
          <NavLink to="posts" className={setActive}>
            Посты
          </NavLink>
          <NavLink to="about" className={setActive}>
            О сайте
          </NavLink>
          <MyButton onClick={logout}>Выйти</MyButton>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
