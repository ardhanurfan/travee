import { ReactNode, createContext, useContext, useState } from "react";

export type PreferencesTypeContext = {
  preferences: string[];
  setPreferences: React.Dispatch<React.SetStateAction<string[]>>;
};

const defaultValue = {
  preferences: [],
  setPreferences: () => {},
};  

export const PreferencesContext =
  createContext<PreferencesTypeContext>(defaultValue);

const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<string[]>([]);

  return (
    <PreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesProvider;

export const usePreferences = () => useContext(PreferencesContext);
