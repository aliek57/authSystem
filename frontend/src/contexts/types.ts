import { type User } from 'firebase/auth';

export interface AuthContextData {
  user: User | null;
  isLoading: boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}