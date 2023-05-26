import styles from "./Cart.module.scss";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { Cart, AppError, Fav } from "../../interfaces/interface";
import React from "react";
import useFav from "../../hooks/useFav";
import { getLocalData } from "../../utils/data";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { useNavigate } from "react-router-dom";

type CartActionType = {
  cartItem: Cart;
  handleDelete: (e: string) => void;
};

const CartAction: React.FC<CartActionType> = ({ cartItem, handleDelete }) => {
  const userId = getLocalData("nike");
  const { handleSetNotification } = useGlobalContext();
  const navigate = useNavigate();

  const { data: favData, refetch } = useQuery(
    ["product-fav", userId, cartItem],
    async () => {
      if (userId && cartItem) {
        const data: Fav[] = await getData(`/fav/${userId}`);
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

  const { mutate, deleteMutate } = useFav({ refetch });

  const handleFav = (cart: Cart) => {
    if (!userId) return navigate("/login");
    const data = {
      userId,
      productId: cart.productId,
      productImage: cart.productImage,
      productName: cart.productName,
      productPrice: cart.productPrice,
      productType: cart.productType,
      productCategory: cart.productCategory,
      slug: cart.slug,
    };
    mutate(data);
  };

  return (
    <div className={styles["cart-action"]}>
      {favData &&
      favData.find((fav) => fav.productId === cartItem.productId) ? (
        <MdFavorite
          onClick={() => deleteMutate({ id: cartItem.productId, userId })}
          size={22}
          cursor="pointer"
        />
      ) : (
        <MdFavoriteBorder
          size={22}
          cursor="pointer"
          onClick={() => handleFav(cartItem)}
        />
      )}

      <RiDeleteBin6Line
        size={20}
        cursor="pointer"
        onClick={() => handleDelete(cartItem._id)}
      />
    </div>
  );
};

export default CartAction;
