import { useGlobalContext } from "../store/GlobalContext";
import { getLocalData } from "../utils/data";
import { useQuery, useMutation } from "react-query";
import { getData, deleteData, updateData, createData } from "../api/api";
import { AppError, Coupon } from "../interfaces/interface";
import { useState } from "react";

const useCoupons = () => {
  const [show, setShow] = useState(false);
  const { handleSetNotification } = useGlobalContext();
  const userId = getLocalData("nike");

  const { data: coupons, refetch } = useQuery(
    ["coupons"],
    async () => {
      const data: Coupon[] = await getData(`/coupon`);
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
      enabled: show,
    }
  );

  const { mutate, isLoading } = useMutation({
    /* eslint-disable @typescript-eslint/no-explicit-any */
    mutationFn: (data: any) => {
      return createData({ userData: data, endpoints: "/coupon" });
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => {
      return deleteData(`/coupon/${id}`);
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: () => {
      refetch();
    },
  });

  return { coupons, isLoading, mutate, deleteMutate, setShow, show };
};

export default useCoupons;
