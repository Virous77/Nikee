import { useState } from "react";
import { useQuery } from "react-query";
import { Product, AppError } from "../interfaces/interface";
import { getData } from "../api/api";
import { useGlobalContext } from "../store/GlobalContext";

const useProducts = () => {
  const [show, setShow] = useState("");
  const { handleSetNotification } = useGlobalContext();

  const { data: productData, refetch } = useQuery(
    ["productAll", show],
    async () => {
      const data: Product[] = await getData(`/product/type/${"Mens"}`);
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
      enabled: show ? true : false,
    }
  );
  return { show, setShow, productData, refetch };
};

export default useProducts;
