import React, { useState, useRef } from "react";
import styles from "./Product.module.scss";
import { Rating } from "react-simple-star-rating";
import { getLocalData } from "../../utils/data";
import { Product, AppError } from "../../interfaces/interface";
import { createData } from "../../api/api";
import { useMutation } from "react-query";
import { useGlobalContext } from "../../store/GlobalContext";

type ReviewModalType = {
  productDetails: Product | undefined;
  refetch: () => void;
};

const ReviewModal: React.FC<ReviewModalType> = ({
  productDetails,
  refetch,
}) => {
  const userId = getLocalData("nike");
  const [rating, setRating] = useState(0);
  const { handleSetNotification } = useGlobalContext();
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const { mutate, isLoading } = useMutation({
    /* eslint-disable @typescript-eslint/no-explicit-any */
    mutationFn: (data: any) => {
      return createData({ endpoints: "/review", userData: data });
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ message, status: "success" });
      refetch();
      setRating(0);
      if (messageRef.current?.value) {
        messageRef.current.value = "";
      }
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data.message, status: "error" });
    },
  });

  const handleCreateReview = () => {
    if (!messageRef.current) return;

    const data = {
      userId,
      productId: productDetails?._id,
      rating,
      userImage: productDetails?.heroImage,
      userName: productDetails?.name,
      message: messageRef.current.value,
    };

    mutate(data);
  };

  return (
    <div className={styles["review-Modal"]}>
      <header>
        <img src={productDetails?.heroImage} alt={productDetails?.name} />
        <div>
          <h2>{productDetails?.name}</h2>
          <p>
            {productDetails?.category}'s {productDetails?.productType}{" "}
          </p>
        </div>
      </header>

      <fieldset>
        <label>Rating</label>
        <Rating
          onClick={(rate) => setRating(rate)}
          transition={true}
          allowFraction={true}
          fillColor="black"
          size={23}
        />
      </fieldset>

      <fieldset style={{ marginTop: "1.5rem" }}>
        <label>Review Message</label>
        <textarea ref={messageRef} />
      </fieldset>

      <div className={styles["review-button"]}>
        <button onClick={handleCreateReview}>
          {isLoading ? "Adding.." : "Add Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
