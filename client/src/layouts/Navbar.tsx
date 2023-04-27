import logo from "../assets/logo.svg";
import styles from "./Layout.module.scss";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className={styles["logo"]}>
          <img src={logo} alt="Nike Logo" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
