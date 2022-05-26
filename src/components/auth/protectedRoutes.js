import { Navigate, Outlet } from 'react-router-dom';

const Authenticate = () => {
  const isAuthenticated = localStorage.getItem('token');
  
  if(isAuthenticated) {
    return true;
  } else {
    return false;
  }
}

const ProtectedRoutes = () => {

  const auth = Authenticate();

  return auth ? <Outlet/> : <Navigate to="/"/>;

}

export default ProtectedRoutes;