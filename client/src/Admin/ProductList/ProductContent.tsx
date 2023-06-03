import { useState } from "react";
import Product from "./Product";
import Coupon from "./Coupon";
import Sneaker from "./Sneaker";
import Tab from "./Tab";

const ProductContent = () => {
  const [activeTab, setActiveTab] = useState("product");

  return (
    <main>
      <Tab setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === "product" && <Product />}
      {activeTab === "sneaker" && <Sneaker />}
      {activeTab === "coupon" && <Coupon />}
    </main>
  );
};

export default ProductContent;
