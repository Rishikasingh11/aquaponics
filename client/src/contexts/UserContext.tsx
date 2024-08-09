import { User } from '@/services/auth/auth.service';
import React from 'react';

export type UserContextType = {
    currentUser: User | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  };

export const UserContext = React.createContext<UserContextType | undefined>(undefined);