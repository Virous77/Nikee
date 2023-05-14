import { Product } from "../interfaces/interface";
import { getLocalDataArray } from "../utils/data";
import { useGlobalContext } from "../store/GlobalContext";
import { Cart } from "../interfaces/interface";
import { useEffect, useState } from "react";

type useCartType = {
  productDetails: Product | undefined;
  selectedSize: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const useCart = (data?: Cart[]) => {
  const { handleSetCartNotification, setState, state } = useGlobalContext();
  const [cartData, setCart] = useState<Cart[]>(data ? data : []);

  const handleAddToBag = ({
    productDetails,
    setError,
    selectedSize,
  }: useCartType) => {
    let cartData: Cart[] = getLocalDataArray("nikeCart");
    if (!selectedSize) return setError("Please select a size");
    if (!productDetails) return;

    const data: Cart = {
      productImage: productDetails?.heroImage,
      productName: productDetails?.name,
      productCategory: productDetails?.category,
      productType: productDetails?.productType,
      productColor: productDetails?.color,
      productId: productDetails?._id,
      productPrice: productDetails?.amount,
      quantity: 1,
      selectSize: productDetails?.size,
      size: selectedSize,
    };

    cartData = cartData.reduce((acc, item) => {
      if (item.productId === data.productId) {
        item.quantity++;
        data.quantity = item.quantity;
      } else {
        acc.unshift(item);
      }
      return acc;
    }, [] as Cart[]);

    handleSetCartNotification(data);
    localStorage.setItem("nikeCart", JSON.stringify([data, ...cartData]));
  };

  useEffect(() => {
    const Total = cartData
      .map((item) => item.quantity)
      .reduce((acc, curr) => acc + curr, 0);
    setState({ ...state, total: Total });
  }, [cartData]);

  return {
    handleAddToBag,
    setCart,
    cartData,
  };
};

export default useCart;
