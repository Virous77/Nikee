import React from "react";
import styles from "./Product.module.scss";
import Size from "../../common/Size";
import ProductAction from "./ProductAction";
import HtmlParser from "../../common/HtmlParser";
import { Product } from "../../interfaces/interface";
import { FavType } from "./ProductInfo";
import ProductReview from "./ProductReview";
import ProductInformation from "./ProductInformation";

type ProductInfoDataType = {
  productDetails: Product | undefined;
  handleSelect: (size: string) => void;
  handleAddToBag: () => void;
  handleFav: () => void;
  isLoading: boolean;
  setAboutProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
  isInFav: FavType | undefined;
  selectedSize: string;
  error: string;
};

const ProductInfoData: React.FC<ProductInfoDataType> = ({
  productDetails,
  handleSelect,
  handleAddToBag,
  handleFav,
  isLoading,
  setAboutProduct,
  isInFav,
  selectedSize,
  error,
}) => {
  return (
    <section className={styles["product-d-info"]}>
      <div className={styles["product-d-t"]}>
        <h1>{productDetails?.name}</h1>
        <p>
          {productDetails?.productType}'s {productDetails?.category}
        </p>

        <b>MRP : $ {productDetails?.amount}</b>
        <span style={{ marginTop: "10px" }}>incl of taxes</span>
        <span>(Also includes all applicable duties)</span>
      </div>

      <div className={styles["product-i-img"]}>
        <img src={productDetails?.heroImage} alt="photo" />
      </div>

      <div className={styles["product-d-size"]}>
        <h3>Select Size</h3>
        <Size
          handleSelect={(size) => handleSelect(size)}
          data={productDetails?.size}
          mainClass="size-select"
          active="active-select"
          productSize={[selectedSize]}
          padding="li-padding-p"
          title="product"
        />
        <p>{error}</p>
      </div>

      <div className={styles["product-action"]}>
        <ProductAction
          name="Add to Bag"
          handleProductAction={handleAddToBag}
          addtoBag={styles["addto-bag"]}
        />
        <ProductAction
          name={isLoading ? "Adding..." : "Favourite"}
          title="yes"
          active={isInFav?.status ? "cool" : undefined}
          handleProductAction={handleFav}
        />
      </div>

      <div className={styles["about-product"]}>
        <HtmlParser data={productDetails?.aboutProduct.substring(0, 300)} />
        <button onClick={() => setAboutProduct(productDetails)}>
          View More Details
        </button>
      </div>

      <ProductReview productDetails={productDetails} />
      <ProductInformation info={productDetails?.productInformation} />
    </section>
  );
};

export default ProductInfoData;
