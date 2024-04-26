import { ApiErrorType } from '@/types/Common';

interface AuthContextState {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  user: AuthContextState;
  setUser: React.Dispatch<React.SetStateAction<AuthContextState>>;
  isLoading: boolean;
  error: ApiErrorType[] | null;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  logoutUser: () => Promise<void>;
}

export type { AuthContextState, AuthContextType };
