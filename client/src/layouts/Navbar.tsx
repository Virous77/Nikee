import logo from "../assets/logo.svg";
import styles from "./Layout.module.scss";
import NavLink from "./NavLink";
import NavAction from "./NavAction";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import { useGlobalContext } from "../store/GlobalContext";
import { Modal } from "../components/Modal/Modal";

const Navbar = () => {
  const { state, setState } = useGlobalContext();

  return (
    <header>
      <Header />
      <nav>
        <div className={styles["logo"]}>
          <Link to={"/"}>
            <img src={logo} alt="Nike Logo" />
          </Link>
        </div>

        <NavLink />
        <div className={styles["nav-action-main"]}>
          <NavAction />
        </div>

        <div className={styles["m-menu"]}>
          <NavAction />
          <div className={styles["menu"]}>
            <AiOutlineMenu
              size={21}
              cursor="pointer"
              onClick={() => setState({ ...state, show: true })}
            />
          </div>
        </div>
      </nav>

      {state.show && (
        <Modal
          onClose={() => setState({ ...state, show: false })}
          isOpen="isOpen"
          classStyle="mobile"
        >
          <MobileMenu />
        </Modal>
      )}
    </header>
  );
};

export default Navbar;
