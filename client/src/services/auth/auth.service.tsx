import { ReactNode, FC } from 'react';
import axios from 'axios';
import { Navigate, useLocation, useParams } from 'react-router-dom';

export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
}

interface Params {
  username?: string;
  userId?: string;
}

interface RequireAuthProps {
  children: ReactNode;
  requiredRoles: string[];
}

const signUp = async (username: string, email: string, password: string) => {
  try {
    const response = await axios.post('/api/signup', {
      username,
      email,
      password,
    });

    if (response.data.message) {
      return response.data;
    }
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};

const signIn = async (username: string, password: string) => {
  try {
    const response = await axios.post('/api/signin', {
      username,
      password,
    });

    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    }
  } catch (error) {
    console.error('There was an error!', error);
    throw error;
  }
};

const signOut = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = (): User | null => {
  return JSON.parse(localStorage.getItem("user") || "null");
};

// Protecting Routes by checking roles
const RequireAuth: FC<RequireAuthProps> = ({ children, requiredRoles }) => {
  const location = useLocation();
  const user: User | null = getCurrentUser();
  const params: Params = useParams();

  if (!user || !requiredRoles.some(role => user.roles.includes(role))) {
    return <Navigate to='/signin' state={{ from: location }} />;
  }

  if (params.username && user.username !== params.username) {
    return <Navigate to='/signin' state={{ from: location }} />;
  }

  if (params.userId && Number(user.id) !== Number(params.userId)) {
    return <Navigate to='/signin' state={{ from: location }} />;
  }

  return <>{children}</>;
};



const authService = {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  RequireAuth,
};

export default authService;
