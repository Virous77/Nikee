import styles from "./Layout.module.scss";
import Search from "../components/search/Search";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BsHandbag } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const NavAction = () => {
  const navigate = useNavigate();
  return (
    <div className={styles["nav-action"]}>
      <Search />
      <button>
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
