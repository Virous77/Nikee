import React from "react";
import styles from "./Fav.module.scss";
import { Fav } from "../../interfaces/interface";

type FavListType = {
  favItem: Fav;
  deleteMutate: (id: string) => void;
};

const FavList: React.FC<FavListType> = ({ favItem, deleteMutate }) => {
  return (
    <div>
      <img src={favItem.productImage} alt={favItem.productName} />
      <div>
        <h2>{favItem.productName}</h2>
        <p>
          {favItem.productCategory} {favItem.productType}
        </p>

        <div>
          <span>{favItem.productPrice}</span>
          <p onClick={() => deleteMutate(favItem._id)}>UNfav</p>
        </div>
      </div>
    </div>
  );
};

export default FavList;
