import { Product } from "../../interfaces/interface";
import HtmlParser from "../../common/HtmlParser";
import styles from "./Style.module.scss";
import ProductImage from "../../components/Product/ProductImage";

type ProductModalType = {
  productDetails: Product | undefined;
};

const ProductModal: React.FC<ProductModalType> = ({ productDetails }) => {
  return (
    <section className={styles["product-d-main"]}>
      <h2 className={styles["title"]}>{productDetails?.name}</h2>

      <ProductImage
        images={
          productDetails
            ? [productDetails?.heroImage, ...productDetails.images]
            : []
        }
      />
      <div className={styles["product-info"]}>
        <h2>{productDetails?.name}</h2>

        <p>
          {productDetails?.productType}'s {productDetails?.category}
        </p>
        <b>MRP : ${productDetails?.amount}</b>
      </div>

      <div className={styles["size-main"]}>
        <h2>Size</h2>
        <div className={styles["size"]}>
          {productDetails?.size.map((size) => (
            <p>{size}</p>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <h2>About Product</h2>
        <HtmlParser data={productDetails?.aboutProduct} />
      </div>
      <hr />
      <div style={{ marginTop: "1rem" }}>
        <h2>Product Information</h2>
        <HtmlParser data={productDetails?.productInformation} />
      </div>

      <div className={styles["other-info"]}>
        <h2>OtherInfo</h2>
        <div>
          <p>Brand :</p>
          <span>{productDetails?.brands}</span>
        </div>

        <div>
          <p>Featured :</p>
          <span>{productDetails?.featured ? "True" : "False"}</span>
        </div>
        <div>
          <p>Sale :</p>
          <span>{productDetails?.sale ? "True" : "False"}</span>
        </div>

        <div>
          <p>Color :</p>
          <span>{productDetails?.color}</span>
        </div>

        <div>
          <p>Discount :</p>
          <span>{productDetails?.discount}%</span>
        </div>
      </div>

      <button>Delete</button>
    </section>
  );
};

export default ProductModal;
