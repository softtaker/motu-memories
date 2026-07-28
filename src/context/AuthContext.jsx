import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

const STORAGE_KEY = "motuAuth";

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      const auth = JSON.parse(saved);

      if (
        auth.authenticated &&
        auth.expires &&
        auth.expires > Date.now()
      ) {
        setAuthenticated(true);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      console.error(err);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const login = (remember = true) => {
    const expires = remember
      ? Date.now() + 1000 * 60 * 60 * 24 * 30 // 30 Days
      : Date.now() + 1000 * 60 * 60 * 24;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        authenticated: true,
        expires,
      })
    );

    setAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}