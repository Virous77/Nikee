import styles from "./Dashboard.module.scss";
import Loader from "../../components/UI/Loader";
import { Product, Sneaker } from "../../interfaces/interface";
import React, { useMemo } from "react";
import { TbSquareRotated, TbShoe } from "react-icons/tb";
import { IoIosMan, IoIosWoman } from "react-icons/io";
import { FaChild } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { GiConverseShoe } from "react-icons/gi";
import { AiOutlineProfile } from "react-icons/ai";
import SellGraph from "./SellGraph";

type DashboardType = {
  isLoading: boolean;
  product: Product[] | undefined;
  sneaker: Sneaker[] | undefined;
};

const Dashboard: React.FC<DashboardType> = ({
  isLoading,
  product,
  sneaker,
}) => {
  const sneakerCount = sneaker ? sneaker?.length : 0;
  const productCount = product ? product?.length : 0;

  const shoes = product?.filter((shoe) => shoe.category === "Shoes");
  const mensProduct = useMemo(() => {
    const data = product?.filter((product) => product.productType === "men");

    return data;
  }, [product]);

  const womenProduct = useMemo(() => {
    const data = product?.filter((product) => product.productType === "women");

    return data;
  }, [product]);

  const kidsProduct = useMemo(() => {
    const data = product?.filter((product) => product.productType === "kids");

    return data;
  }, [product]);

  const totalCategories = useMemo(() => {
    const data = product ? product?.map((product) => product.category) : [];

    return [...new Set(data)];
  }, [product]);

  if (isLoading) return <Loader />;

  return (
    <main className={styles.dashboard}>
      <div>
        <h2>
          <TbSquareRotated /> Nike Products
        </h2>
        <div className={styles.overView}>
          <div className={styles["product-count"]}>
            <MdAccountBalance /> Total Product : {productCount + sneakerCount}
          </div>

          <div className={styles["product-count"]}>
            <GiConverseShoe /> Total Sneakers : {sneakerCount}
          </div>

          <div className={styles["product-count"]}>
            <TbShoe /> Total Shoes : {shoes?.length}
          </div>

          <div className={styles["product-count"]}>
            <AiOutlineProfile /> Total Clothes :{" "}
            {product && shoes && product?.length - shoes?.length}
          </div>
        </div>
      </div>

      <div>
        <h2>
          <TbSquareRotated /> Nike Products Category
        </h2>
        <div className={styles.overView}>
          <div>
            <IoIosMan size={23} /> Men Products : {mensProduct?.length}
          </div>

          <div>
            <IoIosWoman size={23} /> Women Products : {womenProduct?.length}
          </div>

          <div>
            <FaChild size={23} /> Kids Products : {kidsProduct?.length}
          </div>

          <div>
            <MdAccountBalance /> Total Categories : {totalCategories?.length}
          </div>
        </div>
      </div>
      <SellGraph />
    </main>
  );
};

export default Dashboard;
