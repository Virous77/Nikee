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

export const nikeLogo =
  "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F67979fc2-9bc6-4ef1-a91a-9f8129c57645_1500x1500.jpeg";

//  const checkoutData = {
//    amount: 400,
//    userId: id,
//    address: {
//      address: "Patna bihar",
//      landmark: "balesara",
//      postalCode: "841205",
//      state: "bihar",
//      city: "saran",
//      addressType: "home",
//    },
//    order: [
//      "644cdcdad754b8cbc94391f6",
//      "644cdcdad754b8cbc94391f6",
//      "644cdcdad754b8cbc94391f6",
//    ],
//  };