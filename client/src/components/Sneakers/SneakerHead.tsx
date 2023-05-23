import { SlGrid } from "react-icons/sl";
import { BsGrid3X2 } from "react-icons/bs";
import styles from "./Sneakers.module.scss";

type SneakerHeadType = {
  layout: boolean;
  setLayout: React.Dispatch<React.SetStateAction<boolean>>;
};

const SneakerHead: React.FC<SneakerHeadType> = ({ layout, setLayout }) => {
  return (
    <header className={styles["sneak-head"]}>
      <h2>Sneaker Hots</h2>

      {layout ? (
        <BsGrid3X2
          onClick={() => setLayout(false)}
          style={{ display: "flex" }}
          cursor="pointer"
          size={22}
        />
      ) : (
        <SlGrid
          onClick={() => setLayout(true)}
          style={{ display: "flex" }}
          cursor="pointer"
          size={20}
        />
      )}
    </header>
  );
};

export default SneakerHead;
