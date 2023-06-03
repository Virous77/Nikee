import React from "react";
import styles from "./Style.module.scss";

type TabType = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
};

const Tab: React.FC<TabType> = ({ setActiveTab, activeTab }) => {
  return (
    <header className={styles.tab}>
      <ul>
        <li
          onClick={() => setActiveTab("product")}
          className={
            activeTab === "product" ? styles.activeTab : styles.notActiveTab
          }
        >
          Products
        </li>
        <li
          onClick={() => setActiveTab("sneaker")}
          className={
            activeTab === "sneaker" ? styles.activeTab : styles.notActiveTab
          }
        >
          Sneaker
        </li>
        <li
          onClick={() => setActiveTab("coupon")}
          className={
            activeTab === "coupon" ? styles.activeTab : styles.notActiveTab
          }
        >
          Coupon
        </li>
      </ul>
    </header>
  );
};

export default Tab;
