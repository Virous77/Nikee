import styles from "./Sneakers.module.scss";
import { Sneaker } from "../../interfaces/interface";
import React from "react";

type SneakersListType = {
  sneaker: Sneaker;
};

const SneakersList: React.FC<SneakersListType> = ({ sneaker }) => {
  return <div className={styles["sneak-sub"]}>SneakersList</div>;
};

export default SneakersList;
