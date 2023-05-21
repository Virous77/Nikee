import iconic1 from "../assets/asset6.jpeg";
import iconic2 from "../assets/asset7.jpeg";
import iconic3 from "../assets/asset8.jpeg";
import iconic4 from "../assets/asset9.jpeg";
import iconic5 from "../assets/asset10.jpeg";
import iconic6 from "../assets/asset11.jpeg";

import popular1 from "../assets/asset12.jpeg";
import popular2 from "../assets/asset13.jpeg";
import popular3 from "../assets/asset14.jpeg";
import popular4 from "../assets/asset15.jpeg";
import popular5 from "../assets/asset16.jpeg";
import popular6 from "../assets/asset17.jpeg";
import popular7 from "../assets/asset18.jpeg";
import popular8 from "../assets/asset19.jpeg";
import popular9 from "../assets/asset20.jpeg";

export const getLocalData = (name: string) => {
  const localData = localStorage.getItem(name);
  return localData ? JSON.parse(localData) : null;
};

export const getLocalDataArray = (name: string) => {
  const localData = localStorage.getItem(name);
  return localData ? JSON.parse(localData) : [];
};

export const navLinks = [
  {
    id: 1,
    name: "New & Featured",
    link: "/featured",
  },
  {
    id: 2,
    name: "Men",
    link: "/men",
  },
  {
    id: 3,
    name: "Women",
    link: "/women",
  },
  {
    id: 4,
    name: "Kids",
    link: "/kids",
  },
  {
    id: 5,
    name: "Sale",
    link: "/sale",
  },
  { id: 6, name: "SNKRS", link: "/sneakers" },
];

export const iconicShoes = [
  {
    id: 1,
    name: "Air Jordan 1",
    image: iconic1,
  },
  {
    id: 2,
    name: "Air Max",
    image: iconic2,
  },
  {
    id: 3,
    name: "Nike Blazer",
    image: iconic3,
  },
  {
    id: 4,
    name: "Metcon",
    image: iconic4,
  },
  {
    id: 5,
    name: "Pegasus Running",
    image: iconic5,
  },
  {
    id: 6,
    name: "Air Force 1",
    image: iconic6,
  },
];

export const popularShoes = [
  {
    id: 1,
    name: "Nike Dunk Low Retro",
    price: 110,
    Image: popular1,
  },
  {
    id: 2,
    name: "Nike Dunk Low Retro",
    price: 110,
    Image: popular2,
  },
  {
    id: 3,
    name: "Nike Dunk Low Retro",
    price: 110,
    Image: popular3,
  },
  {
    id: 4,
    name: "Nike Dunk Low Retro",
    price: 110,
    Image: popular4,
  },
  {
    id: 5,
    name: "Nike Dunk Low Retro",
    price: 110,
    Image: popular5,
  },
  {
    id: 6,
    name: "Nike Dunk Low Retro",
    price: 110,
    Image: popular6,
  },
  {
    id: 7,
    name: "Nike Dunk Low Retro",
    price: 110,
    Image: popular7,
  },
  {
    id: 8,
    name: "Nike Dunk Low Retro",
    price: 110,
    Image: popular8,
  },
  {
    id: 9,
    name: "Nike Dunk Low Retro",
    price: 110,
    Image: popular9,
  },
];

export const cartItem = [
  {
    id: 1,
    name: "Air Jordan 1 Mid SE",
    color: "white/black",
    Size: "M 13",
    Quantity: 1,
    price: 135,
    image: popular1,
    category: "men's shoes",
  },
  {
    id: 2,
    name: "Air Jordan 1 Mid SE",
    color: "white/black",
    Size: "M 13",
    Quantity: 1,
    price: 135,
    image: popular1,
    category: "women's shoes",
  },
];

export const month = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const dateFormate = (date: Date | string) => {
  const dateData = new Date(date);

  return `${
    month[dateData.getMonth()]
  }  ${dateData.getDate()}  ${dateData.getFullYear()}`;
};

export const nikeLogo =
  "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F67979fc2-9bc6-4ef1-a91a-9f8129c57645_1500x1500.jpeg";

export const getNextDate = (orderData?: Date | undefined) => {
  const date = orderData ? new Date(orderData) : new Date();

  return new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
};

export const sortProduct = [
  {
    id: 1,
    name: "Featured",
    value: "featured",
  },
  {
    id: 2,
    name: "Newest",
    value: "newest",
  },
  {
    id: 3,
    name: "Price: High-Low",
    value: "high-low",
  },
  {
    id: 4,
    name: "Price: Low-High",
    value: "low-high",
  },
];

export const shopByPrice = [
  {
    id: 1,
    name: "Under ₹2500.00",
    value: "0-2500",
  },
  {
    id: 1,
    name: "₹2500.00 to ₹7500.00",
    value: "2500-7500",
  },
  {
    id: 1,
    name: "₹7500.00 to ₹13000.00",
    value: "7500-13000",
  },
  {
    id: 1,
    name: "Over ₹13000.00",
    value: "13000-100000",
  },
];

export const saleType = [
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
