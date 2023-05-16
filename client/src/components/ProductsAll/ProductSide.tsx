import styles from "./Products.module.scss";
import React from "react";
import { productMensCategory } from "../../utils/NikeData";
import { shopByPrice } from "../../utils/data";
import { BsCheck } from "react-icons/bs";
import ProductSideHead from "./ProductSideHead";

type ProductSideType = {
  show: string;
  setShow: React.Dispatch<React.SetStateAction<string>>;
};

const ProductSide: React.FC<ProductSideType> = ({ show, setShow }) => {
  return (
    <aside
      className={show === "show" ? styles["hide-p"] : styles["products-side"]}
    >
      <h1>Mens (1200)</h1>

      <div className={styles["product-category"]}>
        {productMensCategory.map((category) => (
          <p>{category}</p>
        ))}
      </div>

      <div className={styles["shop"]}>
        <ProductSideHead
          name={"Shop By Price"}
          activeCase="price"
          onClick={() => setShow("price")}
          onClose={() => setShow("")}
          show={show}
        />

        {show !== "price" && (
          <div className={styles["shop-list"]}>
            {shopByPrice.map((price) => (
              <div key={price.id} className={styles["shop-sub"]}>
                <p>
                  <BsCheck />
                </p>
                <b>{price.name}</b>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles["shop"]}>
        <ProductSideHead
          name={"Color"}
          activeCase="color"
          onClick={() => setShow("color")}
          onClose={() => setShow("")}
          show={show}
        />

        {show !== "color" && (
          <div className={styles["color-list"]}>
            {[
              "black",
              "red",
              "blue",
              "green",
              "yellow",
              "purple",
              "silver",
            ].map((color) => (
              <div key={color} className={styles["color-sub"]}>
                <p style={{ background: color }}></p>

                <span>{color}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles["shop"]}>
        <ProductSideHead
          name={"Brands"}
          activeCase="brands"
          onClick={() => setShow("brands")}
          onClose={() => setShow("")}
          show={show}
        />

        <div className={styles["product-category"]} style={{ marginTop: "0" }}>
          {productMensCategory.slice(0, 4).map((category) => (
            <p>{category}</p>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ProductSide;
