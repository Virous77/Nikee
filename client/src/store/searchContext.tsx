import React, { createContext, useState, useContext } from "react";

type SearchType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const initialValue: SearchType = {
  search: "",
  setSearch: () => {},
};

const SearchContext = createContext<SearchType>(initialValue);

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

export default SearchContext;
