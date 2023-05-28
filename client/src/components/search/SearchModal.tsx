import styles from "./search.module.scss";
import logo from "../../assets/logo.svg";
import Search from "./Search";
import { useSearchContext } from "../../store/searchContext";
import SearchContent from "./SearchContent";

const SearchModal = () => {
  const { setActive, setSearch } = useSearchContext();

  return (
    <main className={styles["search-models"]}>
      <div className={styles["search-model-wrap"]}>
        <div className={styles["search-modal-logo"]}>
          <img src={logo} alt="nike" />
        </div>
        <Search showClose="true" />
        <button
          onClick={() => {
            setActive(false);
            setSearch("");
          }}
        >
          Cancel
        </button>
      </div>
      <SearchContent />
    </main>
  );
};

export default SearchModal;
