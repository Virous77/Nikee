import styles from "./Layout.module.scss";
import { useNavigate } from "react-router-dom";
import { getLocalData } from "../utils/data";
import { useAuthContext } from "../store/authContext";

const Header = () => {
  const navigate = useNavigate();
  const id = getLocalData("nike");
  const { UserData } = useAuthContext();
  const makeUserName = UserData?.name.split(" ").join("-");

  const handleLogout = () => {
    localStorage.removeItem("nike");
    navigate("/");
  };

  return (
    <header className={styles["auth-header"]}>
      {id ? (
        <div className={styles["header-auth"]}>
          <span onClick={() => navigate(`/profile/${makeUserName}`)}>
            Your Account
          </span>
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
