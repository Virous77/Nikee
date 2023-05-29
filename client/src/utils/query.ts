type queryType = {
  price?: string;
  color?: string;
  brand?: string;
  sort?: string;
  search?: string;
};

export const updateURLParams = ({
  color,
  price,
  brand,
  sort,
  search,
}: queryType) => {
  const searchParams = new URLSearchParams();

  if (price) {
    searchParams.set("price", price);
  }
  if (color) {
    searchParams.set("color", color);
  }
  if (brand) {
    searchParams.set("brand", brand);
  }
  if (sort) {
    searchParams.set("sort", sort);
  }
  const newURL = `${window.location.pathname}?${searchParams.toString()}`;
  window.history.replaceState({}, "", newURL ? newURL : search);

  localStorage.setItem(
    "query",
    JSON.stringify({ price: price, color: color, brand: brand, sort: sort })
  );
};

export const retrieveQueryParams = (search: string) => {
  const searchParams = new URLSearchParams(search);

  const price = searchParams.get("price");
  const color = searchParams.get("color");
  const brand = searchParams.get("brand");
  const sort = searchParams.get("sort");

  return {
    price: price || "",
    color: color || "",
    brand: brand || "",
    sort: sort || "",
  };
};

export const popularSearch = [
  {
    id: 1,
    name: "Nike",
    link: "/query",
  },
  {
    id: 2,
    name: "Shoes",
    link: "/query",
  },
  {
    id: 3,
    name: "T-shirt",
    link: "/query",
  },
  {
    id: 4,
    name: "Sneakers",
    link: "/sneaker",
  },
];
