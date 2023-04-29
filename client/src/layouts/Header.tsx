import styles from "./Layout.module.scss";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header
    className={styles['auth-header']}
    >
      <div className={styles["header-auth"]}>
        <span onClick={() => navigate("/register")}>Join Us</span>
        <span>|</span>
        <span onClick={() => navigate("/login")}>Sign In</span>
      </div>
    </header>
  );
};

export default Header;
