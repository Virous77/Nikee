import { useMutation } from "react-query";
import { createData, deleteData } from "../api/api";
import { useGlobalContext } from "../store/GlobalContext";
import { AppError } from "../interfaces/interface";

type useFavType = {
  refetch: () => void;
};

const useFav = ({ refetch }: useFavType) => {
  const { handleSetNotification } = useGlobalContext();

  ///Add Fave
  const { mutate, isLoading } = useMutation({
    /* eslint-disable @typescript-eslint/no-explicit-any */
    mutationFn: (data: any) => {
      return createData({ endpoints: "/fav", userData: data });
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ message, status: "success" });
      refetch();
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data.message, status: "error" });
    },
  });

  ////Remove Fav
  const { mutate: deleteMutate } = useMutation({
    /* eslint-disable @typescript-eslint/no-explicit-any */
    mutationFn: (data: any) => {
      return deleteData(`/fav/${data.id}/${data.userId}`);
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ message, status: "success" });
      refetch();
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data.message, status: "error" });
    },
  });

  return { mutate, isLoading, deleteMutate };
};

export default useFav;
