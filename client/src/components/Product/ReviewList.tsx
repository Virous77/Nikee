import React from "react";
import styles from "./Product.module.scss";
import { Review } from "../../interfaces/interface";
import { dateFormate } from "../../utils/data";
import { Rating } from "react-simple-star-rating";

type ReviewListType = {
  review: Review;
};

const ReviewList: React.FC<ReviewListType> = ({ review }) => {
  return (
    <div className={styles["review-list"]}>
      <div className={styles["full-flat"]}>
        <div className={styles["flat-user-r"]}>
          <img src={review.userImage} alt={review.userName} />

          <div>
            <h3>{review.userName}</h3>
            <p>{dateFormate(review.createdAt)}</p>
          </div>
        </div>

        <Rating
          readonly={true}
          disableFillHover={true}
          fillColor="black"
          initialValue={review.rating}
          size={18}
          allowFraction={true}
        />
      </div>

      <p className={styles["review-message"]}>{review.message}</p>
    </div>
  );
};

export default ReviewList;
