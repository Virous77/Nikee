import React, { createContext, useState, useContext } from "react";
import { useMutation } from "react-query";
import { createData } from "../api/api";
import { useGlobalContext } from "./GlobalContext";
import { AppError, Product } from "../interfaces/interface";

type SearchType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  data: Product[] | undefined;
  isLoading: boolean;
};

const initialValue: SearchType = {
  search: "",
  setSearch: () => {},
  active: false,
  setActive: () => {},
  handleSearch: () => {},
  data: {} as Product[],
  isLoading: false,
};

const SearchContext = createContext<SearchType>(initialValue);

export const SearchContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(false);
  const { handleSetNotification } = useGlobalContext();

  const { data, mutate, isLoading } = useMutation({
    mutationFn: (data: any): Promise<Product[]> => {
      return createData({ userData: data, endpoints: `/search` });
    },
    onError: ({ data }: AppError) => {
      if (!data) return;
      handleSetNotification({ message: data?.message, status: "error" });
    },
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setActive(true);

    if (search.length >= 3) {
      mutate({ query: e.target.value });
    }
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        active,
        setActive,
        handleSearch,
        data,
        isLoading,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

export default SearchContext;
