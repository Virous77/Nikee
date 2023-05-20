import React from "react";
import styles from "./Fav.module.scss";
import { Fav } from "../../interfaces/interface";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type FavListType = {
  favItem: Fav;
  deleteMutate: (id: string) => void;
};

const FavList: React.FC<FavListType> = ({ favItem, deleteMutate }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles["fav-sub"]}
      onClick={() => navigate(`/product/${favItem.slug}`)}
    >
      <img src={favItem.productImage} alt={favItem.productName} />
      <div className={styles["fa-details"]}>
        <h2>{favItem.productName}</h2>
        <p>
          {favItem.productCategory} {favItem.productType}
        </p>

        <div className={styles["fav-action"]}>
          <span>Price : ${favItem.productPrice}</span>

          <p
            onClick={(e) => {
              e.stopPropagation();
              deleteMutate(favItem._id);
            }}
          >
            <AiOutlineDelete />
          </p>
        </div>
      </div>
    </div>
  );
};

export default FavList;
