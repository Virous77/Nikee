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

type CardType = {
  logo: React.ReactElement;
  total: number;
  name: string;
  color?: string;
};

export function Card({ logo, total, name, color }: CardType) {
  return (
    <div className={styles["card"]} style={{ background: color }}>
      <div className={styles["card-details"]}>
        <h2>{name}</h2>
        <p>Total : {total}</p>
      </div>
      <div className={styles["card-logo"]}>{logo}</div>
    </div>
  );
}

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
          <Card
            logo={<MdAccountBalance />}
            name="Product"
            total={productCount + sneakerCount}
            color="#a71313"
          />

          <Card
            logo={<GiConverseShoe />}
            name="Sneakers"
            total={sneakerCount}
            color="#286090"
          />

          <Card
            logo={<TbShoe />}
            name="Shoes"
            total={shoes ? shoes?.length : 0}
            color="#5dc6a3"
          />

          <Card
            logo={<AiOutlineProfile />}
            name="Others"
            total={product && shoes ? product.length - shoes.length : 0}
            color="#a5a4a4"
          />
        </div>
      </div>

      <div>
        <h2>
          <TbSquareRotated /> Nike Products Category
        </h2>

        <div className={styles.overView}>
          <Card
            logo={<IoIosMan />}
            name="Men"
            total={mensProduct ? mensProduct?.length : 0}
            color="#f26f59"
          />

          <Card
            logo={<IoIosWoman />}
            name="Women"
            total={womenProduct ? womenProduct?.length : 0}
            color="#07aae6"
          />

          <Card
            logo={<FaChild />}
            name="Kids"
            total={kidsProduct ? kidsProduct?.length : 0}
            color="#75c202"
          />

          <Card
            logo={<MdAccountBalance />}
            name="Categories"
            total={totalCategories ? totalCategories?.length : 0}
            color="#a5a4a4"
          />
        </div>
      </div>
      <SellGraph />
    </main>
  );
};

export default Dashboard;
