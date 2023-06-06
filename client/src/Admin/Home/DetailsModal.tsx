import React, { useState } from "react";
import { DetailsType } from "./HomeData";
import EditHomeData from "./EditHomeData";
import styles from "./Home.module.scss";

type DetailsModalType = {
  data: DetailsType;
  setDetails: React.Dispatch<React.SetStateAction<DetailsType | undefined>>;
};

const DetailsModal: React.FC<DetailsModalType> = ({ data, setDetails }) => {
  const [edit, setEdit] = useState<DetailsType | undefined>(undefined);

  return <section className={styles.details}></section>;
};

export default DetailsModal;
