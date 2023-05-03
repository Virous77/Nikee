import { AiOutlineClose } from "react-icons/ai";
import { navLinks } from "../utils/data";
import styles from "./Mobilemenu.module.scss";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../store/GlobalContext";
import { getLocalData } from "../utils/data";

type MobileNavlinksType = {
  id: number;
  name: string;
  link: string;
};

const MobileMenu = () => {
  const navigate = useNavigate();
  const { state, setState } = useGlobalContext();
  const user = getLocalData("nike");

  const handleNavigation = (nav: MobileNavlinksType) => {
    navigate(nav.link);
    setState({ ...state, show: false });
  };

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
          <li key={nav.id} onClick={() => handleNavigation(nav)}>
            {nav.name}
          </li>
        ))}
      </ul>

      {user ? (
        <div className={styles["mobile-auth"]}>
          <button
            onClick={() => {
              navigate(`/profile/${user}`);
              setState({ ...state, show: false });
            }}
            style={{ background: "black", color: "white" }}
          >
            Profile
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("nike");
              navigate("/");
              setState({ ...state, show: false });
            }}
          >
            Logout
          </button>
        </div>
      ) : (
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
      )}
    </aside>
  );
};

export default MobileMenu;
