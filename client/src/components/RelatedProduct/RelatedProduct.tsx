import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError, RelatedData } from "../../interfaces/interface";
import RelatedScroll from "./RelatedScroll";
import { useRef } from "react";

type RelatedProductType = {
  endPoints: string;
  title: string;
  link: string;
  type: string;
};

const RelatedProduct: React.FC<RelatedProductType> = ({
  endPoints,
  title,
  link,
  type,
}) => {
  const { handleSetNotification } = useGlobalContext();
  const nameRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, refetch } = useQuery(
    ["related", type],
    async () => {
      if (endPoints) {
        const data: RelatedData[] = await getData(endPoints);
        return data;
      }
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

  useEffect(() => {
    refetch();
  }, [endPoints]);

  return (
    <RelatedScroll
      isLoading={isLoading}
      title={title}
      products={data}
      nameRef={nameRef}
      scrollHandler={(e: string) => scrollHandler(e)}
      link={link}
    />
  );
};

export default RelatedProduct;
