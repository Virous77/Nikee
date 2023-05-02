import styles from "./Layout.module.scss";
import { useNavigate } from "react-router-dom";
import { getLocalData } from "../utils/data";

const Header = () => {
  const navigate = useNavigate();
  const id = getLocalData("nike");

  const handleLogout = () => {
    localStorage.removeItem("nike");
    navigate("/");
  };

  return (
    <header className={styles["auth-header"]}>
      {id ? (
        <div className={styles["header-auth"]}>
          <span onClick={() => navigate("/profile")}>Profile</span>
          <span>|</span>
          <span onClick={handleLogout}>Logout</span>
        </div>
      ) : (
        <div className={styles["header-auth"]}>
          <span onClick={() => navigate("/register")}>Join Us</span>
          <span>|</span>
          <span onClick={() => navigate("/login")}>Sign In</span>
        </div>
      )}
    </header>
  );
};

export default Header;
