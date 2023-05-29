import { useSearchContext } from "../../store/searchContext";
import styles from "./search.module.scss";
import { popularSearch } from "../../utils/query";
import { useNavigate } from "react-router-dom";
import SearchItemList from "./SearchItemList";

const SearchContent = () => {
  const { data, isLoading, search, setActive, setSearch } = useSearchContext();
  const navigate = useNavigate();

  return (
    <section>
      {search.length <= 3 ? (
        <div className={styles["most-search"]}>
          <h2>Popular Search Terms</h2>

          <ul>
            {popularSearch.map((search) => (
              <li
                key={search.id}
                onClick={() => {
                  setActive(false);
                  setSearch("");

                  if (search.name === "Sneakers") {
                    navigate("/sneakers");
                  } else {
                    navigate(`${search.link}?search=${search.name}`);
                  }
                }}
              >
                {search.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles["result-list"]}>
          {data?.map((product) => (
            <SearchItemList key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchContent;
