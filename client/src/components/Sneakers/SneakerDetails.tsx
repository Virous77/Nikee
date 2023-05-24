import React, { useState } from "react";
import { Sneaker } from "../../interfaces/interface";
import styles from "./Sneakers.module.scss";
import HtmlParser from "../../common/HtmlParser";
import SneakerSize from "./SneakerSize";
import { getData } from "../../api/api";
import { useQuery } from "react-query";
import { Cart } from "../../interfaces/interface";
import { getLocalData } from "../../utils/data";
import useCart from "../../hooks/useCart";

type SneakerDetailsType = {
  sneaker: Sneaker | undefined;
};

const SneakerDetails: React.FC<SneakerDetailsType> = ({ sneaker }) => {
  const [sSize, setSSize] = useState("");
  const [error, setError] = useState("");
  const userId = getLocalData("nike");
  const { updateMutate, mutate: createMutate } = useCart();

  const { data: inCartData, refetch: cartRefetch } = useQuery(
    ["inCart", sneaker?._id],
    async () => {
      if (sneaker?._id && userId) {
        const data: Cart = await getData(`/cart/${sneaker._id}/${userId}`);
        return data;
      }
    },
    {
      retry: false,
    }
  );

  const handleAddToBag = () => {
    const id = getLocalData("cartId");
    cartRefetch();
    if (!sSize) return setError("Please select a size");
    if (!sneaker) return;

    const data = {
      userId,
      productImage: sneaker?.heroImage,
      productName: sneaker?.name,
      productCategory: "sneaker",
      productType: sneaker?.sneakerType,
      productColor: sneaker?.color,
      productId: sneaker?._id,
      productPrice: sneaker?.amount,
      quantity: 1,
      selectSize: sneaker?.size,
      size: sSize,
      slug: sneaker.slug,
    };

    const { quantity, ...restData } = data;
    if (inCartData || id) {
      const updateData = {
        ...restData,
        quantity: inCartData ? inCartData.quantity + 1 : 2,
      };
      updateMutate({ id: inCartData ? inCartData._id : id, updateData });
    } else {
      createMutate(data);
    }

    if (inCartData) {
      localStorage.removeItem("cartId");
    }
  };

  return (
    <div className={styles["single-sneak-det"]}>
      <div className={styles["sneak-sing-head"]}>
        <p>{sneaker?.color}</p>
        <h2>{sneaker?.name}</h2>

        <b>MRP : ${sneaker?.amount?.toFixed(2)}</b>
        <span>incl. of all taxes</span>
        <span>(Also includes all applicable duties)</span>
      </div>

      <div className={styles["sneak-content"]}>
        <HtmlParser data={sneaker?.aboutSneaker} />
      </div>

      <div className={styles["sneak-number"]}>
        <p>Product Information:</p>
        <span>SKU: {sneaker?._id.slice(2, 12)}</span>
      </div>

      <div className={styles["sneak-information"]}>
        <HtmlParser data={sneaker?.sneakerInformation} />
      </div>

      <SneakerSize size={sneaker?.size} sSize={sSize} setSSize={setSSize} />
      <p className={styles["error"]}>{error}</p>

      <div className={styles["buy"]}>
        <button onClick={handleAddToBag}>BUY</button>
      </div>
    </div>
  );
};

export default SneakerDetails;
