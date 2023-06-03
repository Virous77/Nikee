export const productMensCategory = [
  "Shoes",
  "T-shirt",
  "Socks",
  "Lower",
  "Trousers",
  "Shorts",
  "Hoodie",
  "Sweatshirt",
  "Jacket",
];

export const productWomenCategory = [
  "Shoes",
  "Pants",
  "Skirt",
  "Shorts",
  "Leggings",
  "T-shirt",
  "Jacket",
  "Trousers",
  "Bra",
  "Top",
  "Socks",
  "Hoodie",
  "Sweatshirt",
];

export const productType = ["Men", "Women", "Kids"];

export const clothSizeMen = ["S", "M", "L", "XL", "2XL"];
export const clothSizeWomen = ["XS", "S", "M", "L", "XL"];

export const shocksSize = ["2-5", "5-8", "8-11", "11-15"];

export const shoesSizeMens = [
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
  "10.5",
  "11",
  "11.5",
  "12",
];

export const shoesSizeWomen = [
  "3",
  "3.5",
  "4",
  "4.5",
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
];

type sizeType = {
  products: string;
  Category: string;
  name: string;
};

export const size = ({ Category, products, name }: sizeType) => {
  const returnValueShoes = products === "men" ? shoesSizeMens : shoesSizeWomen;
  const returnValueClothes = products === "men" ? clothSizeMen : clothSizeWomen;

  if (products === name && Category === "Shoes") return returnValueShoes;
  if (products === name && Category === "Socks") return shocksSize;
  if (products === name) {
    if (Category !== "Shoes" && Category !== "Socks") return returnValueClothes;
  }

  return products === "men" ? clothSizeMen : clothSizeWomen;
};
