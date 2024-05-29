import { ReactNode, createContext, useContext, useState } from "react";

export type PersonalizeTypeContext = {
  destination: string;
  preferences: string[];
  count_people: string;
  start_date: Date;
  end_date: Date;
  budget: string;
  photo_url: string;
  country: string;
  name: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  setPreferences: React.Dispatch<React.SetStateAction<string[]>>;
  setCountPeople: React.Dispatch<React.SetStateAction<string>>;
  setBudget: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  setPhotoUrl: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  clear: () => void;
};

const defaultValue = {
  destination: "",
  preferences: [],
  count_people: "",
  start_date: new Date(),
  end_date: new Date(),
  budget: "",
  photo_url: "",
  country: "",
  name: "",
  setDestination: () => {},
  setPreferences: () => {},
  setCountPeople: () => {},
  setBudget: () => {},
  setStartDate: () => {},
  setEndDate: () => {},
  setPhotoUrl: () => {},
  setCountry: () => {},
  setName: () => {},
  clear: () => {}
};

export const PersonalizeContext =
  createContext<PersonalizeTypeContext>(defaultValue);

const PersonalizeProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [destination, setDestination] = useState<string>("");
  const [count_people, setCountPeople] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [start_date, setStartDate] = useState<Date>(new Date());
  const [end_date, setEndDate] = useState<Date>(new Date());
  const [photo_url, setPhotoUrl] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [name, setName] = useState<string>("");

  const clear = () => {
    setPreferences([]);
    setDestination("");
    setCountPeople("");
    setBudget("");
    setPhotoUrl("");
    setCountry("");
    setName("");
    setStartDate(new Date());
    setEndDate(new Date());
  };

  return (
    <PersonalizeContext.Provider
      value={{
        preferences,
        destination,
        count_people,
        budget,
        start_date,
        end_date,
        photo_url,
        country,
        name,
        setPreferences,
        setDestination,
        setCountPeople,
        setBudget,
        setStartDate,
        setEndDate,
        setPhotoUrl,
        setCountry,
        setName,
        clear,
      }}
    >
      {children}
    </PersonalizeContext.Provider>
  );
};

export default PersonalizeProvider;

export const usePersonalize = () => useContext(PersonalizeContext);
