import { useNavigate } from "react-router-dom";
import { navLinks } from "../utils/data";
import styles from "./Layout.module.scss";
import useProducts from "../hooks/useProducts";

const NavLink = () => {
  const navigate = useNavigate();
  const { setShow } = useProducts();

  return (
    <ul className={styles["link-list"]}>
      {navLinks.map((type) => (
        <li
          key={type.id}
          onClick={() => {
            navigate(type.link);
            setShow(type.name);
          }}
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
};

export default NavLink;
