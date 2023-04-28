import styles from "./Layout.module.scss";
import Search from "../components/search/Search";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { useSearchContext } from "../store/searchContext";

const NavAction = () => {
  const navigate = useNavigate();
  const { setActive } = useSearchContext();

  return (
    <div className={styles["nav-action"]}>
      <Search classStyle="hide" />

      <button className={styles["m-search"]}>
        <BiSearch size={22} cursor="pointer" onClick={() => setActive(true)} />
      </button>

      <button className={styles["fav"]}>
        <MdOutlineFavoriteBorder
          size={22}
          cursor="pointer"
          onClick={() => navigate("/fav")}
        />
      </button>

      <button>
        <BsHandbag
          size={19}
          cursor="pointer"
          onClick={() => navigate("/cart")}
        />
      </button>
    </div>
  );
};

export default NavAction;
