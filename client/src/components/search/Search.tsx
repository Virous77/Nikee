import React from "react";
import { BiSearch } from "react-icons/bi";
import { useSearchContext } from "../../store/searchContext";

const Search = () => {
  const { setSearch, search } = useSearchContext();

  console.log(search);

  return <div>Search</div>;
};

export default Search;
