import React, { useMemo, useState } from "react";
import styles from "./Product.module.scss";
import { Rating } from "react-simple-star-rating";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import ReviewModal from "./ReviewModal";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import { Product, AppError, Review } from "../../interfaces/interface";
import { getData } from "../../api/api";
import { useQuery } from "react-query";
import { useGlobalContext } from "../../store/GlobalContext";

type ProductReviewType = {
  productDetails: Product | undefined;
};

const ProductReview: React.FC<ProductReviewType> = ({ productDetails }) => {
  const [showMore, setShowMore] = useState<string | undefined>(undefined);
  const { handleSetNotification } = useGlobalContext();

  const { data: reviewData, refetch } = useQuery(
    ["review", productDetails],
    async () => {
      if (productDetails) {
        const data: Review[] = await getData(`/review/${productDetails._id}`);
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

  const ratingAverage = useMemo(() => {
    const total = reviewData
      ?.map((review) => review.rating)
      .reduce((acc, curr) => acc + curr, 0);

    return total && reviewData && +(total / reviewData?.length);
  }, [reviewData]);

  return (
    <React.Fragment>
      <div className={styles["product-review"]}>
        <div className={styles["top-review"]}>
          <p>Reviews ({reviewData?.length})</p>
          <div className={styles["rating"]}>
            <Rating
              initialValue={ratingAverage}
              disableFillHover={true}
              readonly={true}
              transition={true}
              allowFraction={true}
              fillColor="black"
              size={22}
            />
            {!showMore ? (
              <BiChevronDown
                onClick={() => setShowMore("review")}
                size={23}
                cursor="pointer"
              />
            ) : (
              <BiChevronUp
                onClick={() => setShowMore(undefined)}
                size={23}
                cursor="pointer"
              />
            )}
          </div>
        </div>
        {showMore === "review" && (
          <div className={styles["review-Body"]}>
            <button onClick={() => setShowMore("write")}>Write a Review</button>
          </div>
        )}
      </div>

      {showMore === "write" && (
        <Modal isOpen="isOpen" onClose={() => setShowMore(undefined)}>
          <ModalHeader
            onClose={() => setShowMore(undefined)}
            name="Write Review"
          />
          <ReviewModal productDetails={productDetails} refetch={refetch} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ProductReview;
