import logo from "../assets/logo.svg";
import styles from "./Layout.module.scss";
import NavLink from "./NavLink";
import NavAction from "./NavAction";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";

const Navbar = () => {
  return (
    <header>
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
            <AiOutlineMenu size={21} cursor="pointer" />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
