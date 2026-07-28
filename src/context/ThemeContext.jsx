import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ThemeContext = createContext();

const themes = {
  pink: {
    primary: "from-pink-500 to-rose-500",
    background:
      "from-pink-100 via-rose-50 to-pink-200",
  },

  rose: {
    primary: "from-rose-500 to-red-500",
    background:
      "from-rose-100 via-red-50 to-rose-200",
  },

  purple: {
    primary: "from-purple-500 to-fuchsia-500",
    background:
      "from-purple-100 via-fuchsia-50 to-purple-200",
  },

  gold: {
    primary: "from-amber-500 to-yellow-500",
    background:
      "from-yellow-100 via-amber-50 to-yellow-200",
  },
};

export function ThemeProvider({
  children,
}) {
  const [theme, setTheme] = useState("pink");

  useEffect(() => {
    const data = localStorage.getItem(
      "motuSettings"
    );

    if (!data) return;

    try {
      const settings = JSON.parse(data);

      if (settings.theme) {
        setTheme(settings.theme);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);

    const data =
      JSON.parse(
        localStorage.getItem("motuSettings")
      ) || {};

    data.theme = newTheme;

    localStorage.setItem(
      "motuSettings",
      JSON.stringify(data)
    );
  };

  const value = useMemo(
    () => ({
      theme,
      changeTheme,
      colors:
        themes[theme] || themes.pink,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}