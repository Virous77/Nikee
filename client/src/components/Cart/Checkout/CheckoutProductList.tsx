import styles from "./Checkout.module.scss";
import { Cart } from "../../../interfaces/interface";
import useCart from "../../../hooks/useCart";
import {
  getLocalDataArray,
  getNextDate,
  dateFormate,
} from "../../../utils/data";

const CheckoutProductList = () => {
  const data: Cart[] = getLocalDataArray("nikeCart");
  const { cartData } = useCart(data);

  const date = getNextDate();

  return (
    <div className={styles["checkout-product"]}>
      <h3>Arriving by {dateFormate(date)}</h3>

      <div className={styles["product-list"]}>
        {cartData.map((item) => (
          <div key={item.productId} className={styles["list-sub"]}>
            <img src={item.productImage} alt={item.productName} />
            <div className={styles["checkout-details"]}>
              <p>
                {item.productName} {item.productCategory}
              </p>
              <span>Size : {item.size}</span>{" "}
              <span style={{ marginLeft: "10px" }}>
                {" "}
                Color : {item.productColor}
              </span>
              <div>
                <span>Qty: 7</span>
              </div>
              <span>Price : ${item.productPrice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProductList;
