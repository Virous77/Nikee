import { getLocalData } from "../utils/data";
import { useGlobalContext } from "../store/GlobalContext";
import { Cart, AppError } from "../interfaces/interface";
import { useQuery, useMutation } from "react-query";
import { getData, createData, deleteData, updateData } from "../api/api";
import { useMemo } from "react";

type updateType = {
  id: string;
  updateData: any;
};

const useCart = () => {
  const userId = getLocalData("nike");
  const cartId = getLocalData("offCartId");
  const { handleSetNotification, handleSetCartNotification } =
    useGlobalContext();

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => {
      return createData({ userData: data, endpoints: "/cart" });
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: (data) => {
      handleSetCartNotification(data);
      refetch();
      localStorage.setItem("cartId", JSON.stringify(data._id));
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => {
      return deleteData(`/cart/${id}`);
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: deleteMultipleMutate } = useMutation({
    mutationFn: (id: string) => {
      return deleteData(`/cart/many/${id}`);
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: (data: updateType) => {
      return updateData({
        endpoints: `/cart/${data.id}`,
        userData: data.updateData,
      });
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const {
    data: cartData,
    refetch,
    isLoading: cartLoading,
  } = useQuery(
    ["cartData"],
    async () => {
      if (userId || cartId) {
        const data: Cart[] = await getData(`/cart/${userId ? userId : cartId}`);
        return data;
      }
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

  const subTotal = useMemo(() => {
    const data = cartData
      ?.map((item) => item.productPrice)
      ?.reduce((acc, curr) => acc + curr, 0);

    return data;
  }, [cartData]);

  const Total = useMemo(() => {
    const data = cartData
      ?.map((item) => item.quantity)
      ?.reduce((acc, curr) => acc + curr, 0);

    return data;
  }, [cartData]);

  const totalPrice = subTotal && Total && subTotal * Total;
  const totalTax = totalPrice && totalPrice * 0.1;

  return {
    cartData,
    mutate,
    isLoading,
    deleteMutate,
    Total,
    totalPrice,
    totalTax,
    updateMutate,
    deleteMultipleMutate,
    refetch,
    cartLoading,
  };
};

export default useCart;
