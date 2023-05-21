import { useNavigate, useLocation } from "react-router-dom";
import { navLinks } from "../utils/data";
import styles from "./Layout.module.scss";

const NavLink = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathExact =
    pathname === "/men" || pathname === "/women" || pathname === "/kids";

  return (
    <ul className={styles["link-list"]}>
      {navLinks.map((type) => (
        <li
          key={type.id}
          onClick={() => {
            if (type.name === "Sale") {
              if (pathExact) {
                navigate(`/sale${pathname}`);
              } else {
                navigate(`/sale/men`);
              }
            } else {
              navigate(type.link);
            }
          }}
        >
          {type.name}
        </li>
      ))}
    </ul>
  );
};

export default NavLink;
