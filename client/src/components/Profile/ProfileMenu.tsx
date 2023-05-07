import { VscAccount } from "react-icons/vsc";
import { FaRegAddressCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../store/authContext";
import { FiShoppingBag } from "react-icons/fi";
import styles from "./Profile.module.scss";
import { useLocation } from "react-router-dom";
import { MdOutlineFavorite } from "react-icons/md";

const ProfileMenu = () => {
  const { UserData } = useAuthContext();
  const makeUserName = UserData?.name.split(" ").join("-");
  const { pathname } = useLocation();

  const homeTab =
    !pathname.includes("address") &&
    !pathname.includes("orders") &&
    !pathname.includes("fav")
      ? styles["active-menu"]
      : "";

  const navigate = useNavigate();
  return (
    <aside className={styles["profile-menu"]}>
      <ul>
        <li
          onClick={() => navigate(`/profile/${makeUserName}`)}
          className={homeTab}
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

        <li
          onClick={() => navigate(`/profile/fav/${makeUserName}`)}
          className={pathname.includes("fav") ? styles["active-menu"] : ""}
        >
          <MdOutlineFavorite /> Favorite
        </li>
      </ul>
    </aside>
  );
};

export default ProfileMenu;
