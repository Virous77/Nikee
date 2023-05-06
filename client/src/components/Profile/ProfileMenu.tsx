import { VscAccount } from "react-icons/vsc";
import { FaRegAddressCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/authContext";
import { FiShoppingBag } from "react-icons/fi";
import styles from "./Profile.module.scss";
import { useLocation } from "react-router-dom";

const ProfileMenu = () => {
  const { UserData } = useAuthContext();
  const makeUserName = UserData?.name.split(" ").join("-");
  const { pathname } = useLocation();

  const navigate = useNavigate();
  return (
    <aside className={styles["profile-menu"]}>
      <ul>
        <li
          onClick={() => navigate(`/profile/${makeUserName}`)}
          className={
            !pathname.includes("address") && !pathname.includes("orders")
              ? styles["active-menu"]
              : ""
          }
        >
          <VscAccount /> Account
        </li>

        <li
          onClick={() => navigate(`/profile/address/${makeUserName}`)}
          className={pathname.includes("address") ? styles["active-menu"] : ""}
        >
          <FaRegAddressCard /> Address
        </li>

        <li
          onClick={() => navigate(`/profile/orders/${makeUserName}`)}
          className={pathname.includes("orders") ? styles["active-menu"] : ""}
        >
          <FiShoppingBag /> Orders
        </li>
      </ul>
    </aside>
  );
};

export default ProfileMenu;
