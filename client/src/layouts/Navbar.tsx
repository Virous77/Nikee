import logo from "../assets/logo.svg";
import styles from "./Layout.module.scss";
import NavLink from "./NavLink";
import NavAction from "./NavAction";
import { Link } from "react-router-dom";

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
        <NavAction />
      </nav>
    </header>
  );
};

export default Navbar;
