import React from "react";
import { BiSearch } from "react-icons/bi";
import { useSearchContext } from "../../store/searchContext";
import styles from "./search.module.scss";
import { AiOutlineClose } from "react-icons/ai";

type SearchType = {
  showClose?: string;
  classStyle?: string;
};

const Search: React.FC<SearchType> = ({ showClose, classStyle }) => {
  const { setSearch, search, setActive } = useSearchContext();

  return (
    <div className={classStyle ? styles[classStyle] : styles["search"]}>
      <div className={styles["search-wrap"]}>
        <BiSearch size={22} />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setActive(true);
          }}
        />
        {showClose === "true" && (
          <>
            {search.length > 0 && (
              <AiOutlineClose
                onClick={() => setSearch("")}
                size={22}
                cursor="pointer"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
