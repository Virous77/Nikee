import React from "react";
import { Product } from "../../interfaces/interface";
import styles from "./search.module.scss";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../../store/searchContext";
import Spinner from "../UI/Spinner";

type SearchItemListType = {
  product: Product;
  isLoading: boolean;
};

const SearchItemList: React.FC<SearchItemListType> = ({
  product,
  isLoading,
}) => {
  const navigate = useNavigate();
  const { setActive, setSearch } = useSearchContext();
  return (
    <>
      {!isLoading ? (
        <div
          className={styles["result-sub"]}
          onClick={() => {
            navigate(`/product/${product.slug}`);
            setActive(false);
            setSearch("");
          }}
        >
          <img src={product.heroImage} alt={product.name} />
          <div>
            <p>{product.name}</p>
            <span>
              {product.productType}'s {product.category}
            </span>
            <b>MRP: ${product.amount?.toFixed(2)}</b>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default SearchItemList;
