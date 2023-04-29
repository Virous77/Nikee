import logo from "../../assets/logo.svg";
import styles from "./Auth.module.scss";

type AuthHeadType = {
  title: string;
  desc?: string;
};

const AuthHead: React.FC<AuthHeadType> = ({ title, desc }) => {
  return (
    <header className={styles["auth-header"]}>
      <img src={logo} alt="nike" />
      <h1>{title}</h1>
      {desc && <p>{desc}</p>}
    </header>
  );
};

export default AuthHead;
