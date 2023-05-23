import styles from "./Sneakers.module.scss";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { AppError, Sneaker } from "../../interfaces/interface";
import { useGlobalContext } from "../../store/GlobalContext";
import SneakersList from "./SneakersList";
import SneakerHead from "./SneakerHead";
import { useState } from "react";

const Sneakers = () => {
  const [layout, setLayout] = useState(false);
  const { handleSetNotification } = useGlobalContext();

  const { data: sneakers, isLoading } = useQuery(
    ["sneakers"],
    async () => {
      const data: Sneaker[] = await getData("/sneaker");
      return data;
    },
    {
      onError: (response: AppError) => {
        handleSetNotification({
          message: response.data.message,
          status: "error",
        });
      },
      retry: false,
    }
  );

  return (
    <main className={styles["sneakers"]}>
      <SneakerHead layout={layout} setLayout={setLayout} />

      <div className={!layout ? styles["sneak-list"] : styles["sneak-grid"]}>
        {sneakers?.map((sneaker) => (
          <SneakersList key={sneaker._id} sneaker={sneaker} layout={layout} />
        ))}
      </div>
    </main>
  );
};

export default Sneakers;
