import { useMutation } from "react-query";
import { createData, deleteData } from "../api/api";
import { useGlobalContext } from "../store/GlobalContext";
import { AppError } from "../interfaces/interface";

type useFavType = {
  isInFav: boolean | undefined;
  id: string | undefined;
  refetch: () => void;
};

const useFav = ({ isInFav, id, refetch }: useFavType) => {
  const { handleSetNotification } = useGlobalContext();

  const { mutate, isLoading } = useMutation({
    /* eslint-disable @typescript-eslint/no-explicit-any */
    mutationFn: (data: any) => {
      if (isInFav) {
        return deleteData(`/fav/${id}`);
      } else {
        return createData({ endpoints: "/fav", userData: data });
      }
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ message, status: "success" });
      refetch();
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data.message, status: "error" });
    },
  });

  return { mutate, isLoading };
};

export default useFav;
