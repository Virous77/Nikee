import React, { createContext, useState, useContext } from "react";

type SearchType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const initialValue: SearchType = {
  search: "",
  setSearch: () => {},
  active: false,
  setActive: () => {},
};

const SearchContext = createContext<SearchType>(initialValue);

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);

  return (
    <SearchContext.Provider value={{ search, setSearch, active, setActive }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

export default SearchContext;
