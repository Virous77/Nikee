import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

type ProductActionType = {
  name: string;
  handleProductAction: () => void;
  title?: string;
  active?: string;
  addtoBag?: string;
};

const ProductAction: React.FC<ProductActionType> = ({
  name,
  handleProductAction,
  title,
  active,
  addtoBag,
}) => {
  return (
    <button onClick={handleProductAction} className={addtoBag}>
      {name}{" "}
      {title && (
        <span>{active === "cool" ? <MdFavorite /> : <MdFavoriteBorder />}</span>
      )}
    </button>
  );
};

export default ProductAction;
