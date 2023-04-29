import { AiOutlineClose } from "react-icons/ai";
import { navLinks } from "../utils/data";
import styles from "./Mobilemenu.module.scss";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../store/GlobalContext";

const MobileMenu = () => {
  const navigate = useNavigate();
  const { state, setState } = useGlobalContext();
  return (
    <aside className={styles["mobiles"]}>
      <div className={styles["close"]}>
        <AiOutlineClose
          size={21}
          onClick={() => setState({ ...state, show: false })}
          cursor="pointer"
        />
      </div>

      <ul>
        {navLinks.map((nav) => (
          <li
            key={nav.id}
            onClick={() => {
              navigate(nav.link);
              setState({ ...state, show: false });
            }}
          >
            {nav.name}
          </li>
        ))}
      </ul>

      <div className={styles["mobile-auth"]}>
        <button
          onClick={() => {
            navigate("/register");
            setState({ ...state, show: false });
          }}
          style={{ background: "black", color: "white" }}
        >
          Join Us
        </button>
        <button
          onClick={() => {
            navigate("/login");
            setState({ ...state, show: false });
          }}
        >
          Sign IN
        </button>
      </div>
    </aside>
  );
};

export default MobileMenu;
