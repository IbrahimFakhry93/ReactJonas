//* 1. Create new context:

import { createContext, useContext, useEffect } from "react";

import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

//* 2. Create Custom Provider (where we will store the state)

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode"); //* isDarkMode is the key in local storage

  useEffect(
    function () {
      if (isDarkMode) {
        //* documentElement is the root element
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        //* documentElement is the root element
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  //* 3. Create event handler function
  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  //* 4. Pass the state and event handler as value to the provider
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

//* 5. Create custom hook that directly consumes the context:

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");

  return context;
}

export { DarkModeProvider, useDarkMode };
