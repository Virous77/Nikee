import { useNavigate } from "react-router-dom";
import { navLinks } from "../utils/data";
import styles from "./Layout.module.scss";

const NavLink = () => {
  const navigate = useNavigate();
  return (
    <ul className={styles["link-list"]}>
      {navLinks.map((type) => (
        <li key={type.id} onClick={() => navigate(type.link)}>
          {type.name}
        </li>
      ))}
    </ul>
  );
};

export default NavLink;
