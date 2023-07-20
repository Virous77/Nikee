import React, { useRef } from "react";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError, RelatedData } from "../../interfaces/interface";
import RelatedScroll from "../RelatedProduct/RelatedScroll";

const HomePopular = () => {
  const nameRef = useRef<HTMLDivElement>(null);
  const { handleSetNotification } = useGlobalContext();

  const { data: products, isLoading } = useQuery(
    ["popular"],
    async () => {
      const data: RelatedData[] = await getData(`/product/popular/all`);
      return data;
    },
    {
      onError: (response: AppError) => {
        handleSetNotification({
          message: response.data.message,
          status: "error",
        });
      },
      retry: false,
    }
  );

  const scrollHandler = (id: string) => {
    if (!nameRef.current) return;

    if (id === "right") {
      nameRef.current.scrollBy({
        top: 0,
        left: 400,
        behavior: "smooth",
      });
    } else {
      nameRef.current.scrollBy({
        top: 0,
        left: -400,
        behavior: "smooth",
      });
    }
  };

  return (
    <React.Fragment>
      {products && products.length > 0 && (
        <RelatedScroll
          scrollHandler={(e: string) => scrollHandler(e)}
          title="Popular Products"
          products={products}
          nameRef={nameRef}
          isLoading={isLoading}
          link="product"
        />
      )}
    </React.Fragment>
  );
};

export default HomePopular;
