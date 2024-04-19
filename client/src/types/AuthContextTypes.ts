import { ApiError } from '@/types/Common';

interface AuthContextState {
  firstName: string | null;
  lastName: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: AuthContextState;
  isLoading: boolean;
  error: ApiError[] | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export type { AuthContextState, AuthContextType };
