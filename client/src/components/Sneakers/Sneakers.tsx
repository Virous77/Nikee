import styles from "./Sneakers.module.scss";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { AppError, Sneaker } from "../../interfaces/interface";
import { useGlobalContext } from "../../store/GlobalContext";
import SneakersList from "./SneakersList";
import SneakerHead from "./SneakerHead";

const Sneakers = () => {
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
      <SneakerHead />

      <section>
        <h2>Sneaker Hots</h2>

        <div className={styles["sneak-list"]}>
          {sneakers?.map((sneaker) => (
            <SneakersList key={sneaker._id} sneaker={sneaker} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Sneakers;
