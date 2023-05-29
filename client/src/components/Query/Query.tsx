import styles from "./Query.module.scss";
import { useGlobalContext } from "../../store/GlobalContext";
import { getData } from "../../api/api";
import { useQuery } from "react-query";
import { AppError, Product } from "../../interfaces/interface";
import Loader from "../UI/Loader";
import { useLocation } from "react-router-dom";
import QueryList from "./QueryList";

const Query = () => {
  const { handleSetNotification } = useGlobalContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("search");

  const { data, isLoading } = useQuery(
    ["query", search],
    async () => {
      const data: Product[] = await getData(`/search/${search}`);
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

  if (isLoading) return <Loader />;

  return (
    <main className={styles["query"]}>
      <h2>Search Result : {search} </h2>
      <div className={styles["query-wrap"]}>
        {data?.map((product) => (
          <QueryList key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
};

export default Query;
