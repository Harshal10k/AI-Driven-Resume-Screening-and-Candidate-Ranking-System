import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // Load user after refresh
  useEffect(() => {
    const savedUser =
      localStorage.getItem(
        "user"
      );
    const savedToken =
      localStorage.getItem(
        "token"
      );
    if (
      savedUser &&
      savedToken
    ) {
      setUser(
        JSON.parse(savedUser)
      );
      setToken(
        savedToken
      );
    }
    setLoading(false);
  }, []);

  // Login
  const login = (
    userData,
    authToken
  ) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );
    localStorage.setItem(
      "token",
      authToken
    );
    setUser(
      userData
    );
    setToken(
      authToken
    );
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(
      "user"
    );
    localStorage.removeItem(
      "token"
    );
    setUser(null);
    setToken(null);

  };
  return (
    <AuthContext.Provider

        value={{
        user,
        token,
        loading,
        login,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth =
  () =>
    useContext(
      AuthContext
    );