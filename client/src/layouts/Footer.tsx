import { BsGithub, BsTwitter } from "react-icons/bs";
import styles from "./Layout.module.scss";

const Footer = () => {
  const date = new Date();
  return (
    <footer>
      <div>&copy; {date?.getFullYear()} Nike</div>
      <div className={styles["social"]}>
        <a href={`https://github.com/Virous77`} target="blank">
          <BsGithub />
        </a>

        <a href={`https://twitter.com/imbitcoinb`} target="blank">
          <BsTwitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
