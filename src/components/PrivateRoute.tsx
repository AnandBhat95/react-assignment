// PrivateRoute.tsx

import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/app.store';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const isLoggedIn = useAppStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    navigate('/login');  
    return null;  
  }

  return children;  
};

export default PrivateRoute;
