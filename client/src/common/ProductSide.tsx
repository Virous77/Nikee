import styles from "../components/ProductsAll/Products.module.scss";
import React from "react";
import { productMensCategory } from "../utils/NikeData";
import { shopByPrice } from "../utils/data";
import { BsCheck } from "react-icons/bs";
import ProductSideHead from "./ProductSideHead";
import { useNavigate, useLocation } from "react-router-dom";
import { queryType } from "../components/ProductsAll/Products";

type ProductSideType = {
  show: string;
  setShow: React.Dispatch<React.SetStateAction<string>>;
  setQuery: React.Dispatch<React.SetStateAction<queryType>>;
  query: queryType;
  brands: string[] | undefined;
  color: string[] | undefined;
  productCount: number | undefined;
  title: string;
};

const ProductSide: React.FC<ProductSideType> = React.memo(
  ({ show, setShow, query, setQuery, brands, color, productCount, title }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const showOnly =
      pathname === "/kids" || pathname === "/women" || pathname === "/men";

    const saleType = [
      {
        id: 1,
        name: "Men",
        link: "/sale/men",
      },
      {
        id: 2,
        name: "Women",
        link: "/sale/women",
      },
      {
        id: 3,
        name: "Kids",
        link: "/sale/kids",
      },
    ];

    return (
      <aside
        className={show === "show" ? styles["hide-p"] : styles["products-side"]}
      >
        <h1>
          {title} ({productCount})
        </h1>

        {showOnly && (
          <div className={styles["product-category"]}>
            {productMensCategory.map((category, idx) => (
              <p
                key={idx}
                onClick={() => navigate(`/product${pathname}/${category}`)}
              >
                {category}
              </p>
            ))}
          </div>
        )}

        {pathname.includes("sale") && (
          <div
            className={styles["product-category"]}
            style={{ marginTop: "0" }}
          >
            {saleType?.map((brand, idx) => (
              <div key={idx} className={styles["shop-sub"]}>
                <p onClick={() => navigate(`${brand.link}`)}>
                  {pathname === brand.link && <BsCheck />}
                </p>
                <b>{brand.name}</b>
              </div>
            ))}
          </div>
        )}

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
              {shopByPrice.map((price, idx) => (
                <div key={idx} className={styles["shop-sub"]}>
                  <p
                    onClick={() =>
                      setQuery({
                        ...query,
                        price:
                          query.price && query.price === price.value
                            ? ""
                            : price.value,
                      })
                    }
                  >
                    {query.price === price.value && <BsCheck />}
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
              {color?.map((color, idx) => (
                <div key={idx} className={styles["color-sub"]}>
                  <p
                    style={{ background: color }}
                    onClick={() =>
                      setQuery({
                        ...query,
                        color:
                          query.color && query.color === color ? "" : color,
                      })
                    }
                  >
                    {query.color === color && <BsCheck />}
                  </p>

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

          {show !== "brands" && (
            <div
              className={styles["product-category"]}
              style={{ marginTop: "0" }}
            >
              {brands?.map((brand, idx) => (
                <div key={idx} className={styles["shop-sub"]}>
                  <p
                    onClick={() =>
                      setQuery({
                        ...query,
                        brand: query.brand === brand ? "" : brand,
                      })
                    }
                  >
                    {query.brand === brand && <BsCheck />}
                  </p>
                  <b>{brand}</b>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    );
  }
);

export default ProductSide;
