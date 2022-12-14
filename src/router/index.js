import About from '../pages/About';
import Error from '../pages/Error';
import Login from '../pages/Login';
import PostIdPage from '../pages/PostIdPage';
import Posts from '../pages/Posts';
import { Navigate } from 'react-router-dom';

export const privateRoutes = [
  { path: '/about', component: <About /> },
  { path: '/posts', component: <Posts /> },
  { path: '/posts/:id', component: <PostIdPage /> },
  { path: '/login', component: <Navigate to="/posts" /> },
  { path: '/', component: <Navigate to="/posts" /> },
  { path: '*', component: <Error /> }
];
export const publicRoutes = [
  { path: '/login', component: <Login /> },
  { path: '*', component: <Navigate to="/login" /> }
];
