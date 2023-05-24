import React from "react";
import { Product } from "../../interfaces/interface";

type FeaturedListType = {
  product: Product;
};

const FeaturedList: React.FC<FeaturedListType> = ({ product }) => {
  return <div>FeaturedList</div>;
};

export default FeaturedList;
