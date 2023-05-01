import styles from "./Checkout.module.scss";
import { cartItem } from "../../../utils/data";

const CheckoutProductList = () => {
  return (
    <div className={styles["checkout-product"]}>
      <h3>Arriving by Mon 8 May</h3>

      <div className={styles["product-list"]}>
        {cartItem.map((item) => (
          <div key={item.id} className={styles["list-sub"]}>
            <img src={item.image} alt={item.name} />
            <div className={styles["checkout-details"]}>
              <p>
                {item.name} {item.category}
              </p>
              <span>Size: {item.Size}</span>
              <span>Color: {item.color}</span>
              <div>
                <span>Qty: 7</span>
                <span>@</span>
                <span>${item.price}</span>
              </div>
              <span>$875.00</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutProductList;
