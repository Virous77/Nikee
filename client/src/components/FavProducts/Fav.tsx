import styles from "./Fav.module.scss";
import { useQuery, useMutation } from "react-query";
import { getData, deleteData } from "../../api/api";
import { getLocalData } from "../../utils/data";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError, Fav } from "../../interfaces/interface";
import FavList from "./FavList";

const FavComp = () => {
  const userId = getLocalData("nike");
  const { handleSetNotification } = useGlobalContext();

  const { data: favData, refetch } = useQuery(
    ["fav"],
    async () => {
      const data: Fav[] = await getData(`/fav/${userId}`);
      return data;
    },
    {
      onError: (response: AppError) => {
        handleSetNotification({
          message: response.data.message,
          status: "error",
        });
      },
    }
  );

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => {
      return deleteData(`/fav/${id}/${userId}`);
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: () => {
      refetch();
    },
  });

  return (
    <main className={styles["fave"]}>
      <div className={styles["fav-wrap"]}>
        {favData &&
          favData.map((item) => (
            <FavList
              favItem={item}
              key={item._id}
              deleteMutate={deleteMutate}
            />
          ))}
      </div>
    </main>
  );
};

export default FavComp;
