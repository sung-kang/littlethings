import { createContext, useEffect, useState } from 'react';
import { AuthContextState, AuthContextType } from '@/types/AuthContextTypes';
import { ApiError } from '@/types/Common';

const defaultUserContext: AuthContextState = {
  firstName: null,
  lastName: null,
  email: null,
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextType>({
  user: defaultUserContext,
  isLoading: false,
  error: null,
  loginUser: async () => {},
  registerUser: async () => {},
  logoutUser: async () => {},
});

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(defaultUserContext);
  const [error, setError] = useState<ApiError[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginUser = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const userData = await response.json();
      response.ok
        ? setUser({
            firstName: userData.message.firstName,
            lastName: userData.message.lastName,
            email: userData.message.email,
            isAuthenticated: true,
          })
        : setError(userData.errors);
    } catch (error) {
      console.error('Error logging in', error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/users/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        }),
      });

      const userData = await response.json();

      response.ok
        ? setUser({
            firstName: userData.message.firstName,
            lastName: userData.message.lastName,
            email: userData.message.email,
            isAuthenticated: true,
          })
        : setError(userData.errors);
    } catch (error) {
      console.error('Error logging in', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseData = await response.json();

      response.ok ? setUser(defaultUserContext) : setError(responseData.errors);
    } catch (error) {
      console.error('Error logging in', error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyAuthentication = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/v1/auth/authenticate', {
        method: 'GET',
        credentials: 'include',
      });

      const userData = await response.json();

      if (response.ok) {
        setUser({
          firstName: userData.message.firstName,
          lastName: userData.message.lastName,
          email: userData.message.email,
          isAuthenticated: true,
        });
      } else {
        setError(userData.errors);
        setUser(defaultUserContext);
      }
    } catch (error) {
      console.error('Error verifying authentication:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, error, isLoading, loginUser, registerUser, logoutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
