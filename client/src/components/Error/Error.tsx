import notfound from "../../assets/404_image.png";
import styles from "./Error.module.scss";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <main className={styles["error"]}>
      <section>
        <img src={notfound} alt="not-found" />
        <h2>Oops! This page was lost in space...</h2>
        <p>
          Check if you’re using the right address or explore our website by
          clicking on the button below.
        </p>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </section>
    </main>
  );
};

export default Error;
