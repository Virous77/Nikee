import React, { useState } from "react";
import styles from "./Product.module.scss";
import { Product } from "../../interfaces/interface";
import Size from "../../common/Size";
import ProductAction from "./ProductAction";
import HtmlParser from "../../common/HtmlParser";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import ProductAboutModal from "./ProductAboutModal";

type ProductDetailsType = {
  productDetails: Product | undefined;
};

const ProductInfo = ({ productDetails }: ProductDetailsType) => {
  const [aboutProduct, setAboutProduct] = useState<Product | undefined>(
    undefined
  );
  const handleSelect = () => {};

  return (
    <React.Fragment>
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
            handleSelect={handleSelect}
            data={productDetails?.size}
            mainClass="size-select"
            active="active-select"
            productSize={productDetails?.size}
            padding="li-padding-p"
            title="product"
          />
        </div>

        <div className={styles["product-action"]}>
          <ProductAction
            name="Add to Bag"
            handleProductAction={() => console.log("col")}
            addtoBag={styles["addto-bag"]}
          />
          <ProductAction
            name="Favourite"
            title="yes"
            active="cool"
            handleProductAction={() => console.log("col")}
          />
        </div>

        <div className={styles["about-product"]}>
          <HtmlParser data={productDetails?.aboutProduct.substring(0, 300)} />
          <button onClick={() => setAboutProduct(productDetails)}>
            View More Details
          </button>
        </div>
      </section>

      {aboutProduct && (
        <Modal isOpen="isOpen" onClose={() => setAboutProduct(undefined)}>
          <ModalHeader
            name="Product Details"
            onClose={() => setAboutProduct(undefined)}
          />
          <ProductAboutModal data={aboutProduct} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ProductInfo;
