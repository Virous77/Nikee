import React, { useState } from "react";
import { DetailsType } from "./HomeData";
import EditHomeData from "./EditHomeData";
import styles from "./Home.module.scss";

export type DetailsModalType = {
  data: DetailsType;
  setDetails: React.Dispatch<React.SetStateAction<DetailsType | undefined>>;
  refetch: () => void;
};

const DetailsModal: React.FC<DetailsModalType> = ({
  data,
  setDetails,
  refetch,
}) => {
  const [edit, setEdit] = useState<DetailsType | undefined>(undefined);

  return (
    <section className={styles.details}>
      {!edit ? (
        <>
          <div className={styles["edit-button"]}>
            <button onClick={() => setEdit(data)}>Edit</button>
          </div>

          <div className={styles["details-content"]}>
            <img src={data.data.image} alt={data.data.title} />
            <h2>{data.data.title}</h2>
            {data.data.description && <p>{data.data.description}</p>}
          </div>
        </>
      ) : (
        <EditHomeData
          data={data}
          setDetails={setDetails}
          setEdit={setEdit}
          refetch={refetch}
        />
      )}
    </section>
  );
};

export default DetailsModal;
