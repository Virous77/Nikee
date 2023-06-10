import styles from "./Sneakers.module.scss";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { AppError, Sneaker } from "../../interfaces/interface";
import { useGlobalContext } from "../../store/GlobalContext";
import SneakersList from "./SneakersList";
import SneakerHead from "./SneakerHead";
import { useState } from "react";
import Loader from "../UI/Loader";

const Sneakers = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [empty, setEmpty] = useState(1);
  const pageSize = 9;
  const [layout, setLayout] = useState(false);
  const [state, setState] = useState<Sneaker[]>([]);
  const { handleSetNotification } = useGlobalContext();

  const { isLoading } = useQuery(
    ["sneakers", pageNumber],
    async () => {
      const data: Sneaker[] = await getData(
        `/sneaker/${pageNumber}/${pageSize}`
      );
      return data;
    },
    {
      onSuccess: (data) => {
        setState(state?.concat(data));
        if (data.length < 9) {
          setEmpty(0);
        }
      },
      onError: (response: AppError) => {
        handleSetNotification({
          message: response.data.message,
          status: "error",
        });
      },
      retry: false,
      enabled: state?.length <= 1,
    }
  );

  const fetchMoreData = async (page: number) => {
    const data = await getData(`/sneaker/${page}/${pageSize}`);
    setState(state.concat(data));
    if (data.length < 9) {
      setEmpty(0);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <main className={styles["sneakers"]}>
      <SneakerHead layout={layout} setLayout={setLayout} />

      <div className={!layout ? styles["sneak-list"] : styles["sneak-grid"]}>
        {state?.map((sneaker) => (
          <SneakersList key={sneaker._id} sneaker={sneaker} layout={layout} />
        ))}
      </div>

      {empty === 1 && (
        <div
          className={styles.load}
          onClick={() => {
            fetchMoreData(pageNumber + 1);
            setPageNumber(pageNumber + 1);
          }}
        >
          Load More
        </div>
      )}
    </main>
  );
};

export default Sneakers;
