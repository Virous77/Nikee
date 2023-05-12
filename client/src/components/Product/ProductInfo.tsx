import React, { useState } from "react";
import { Product, AppError } from "../../interfaces/interface";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import ProductAboutModal from "./ProductAboutModal";
import { useMutation, useQuery } from "react-query";
import { createData, deleteData, getData } from "../../api/api";
import { getLocalData } from "../../utils/data";
import { useGlobalContext } from "../../store/GlobalContext";
import ProductInfoData from "./ProductInfoData";

type ProductDetailsType = {
  productDetails: Product | undefined;
};

export type FavType = {
  status: boolean;
};

const ProductInfo = ({ productDetails }: ProductDetailsType) => {
  const [aboutProduct, setAboutProduct] = useState<Product | undefined>(
    undefined
  );

  const userId = getLocalData("nike");
  const { handleSetNotification } = useGlobalContext();

  const { data: isInFav, refetch } = useQuery(
    ["product-fav", userId, productDetails?._id],
    async () => {
      if (productDetails?._id) {
        const data: FavType = await getData(
          `/fav/${productDetails._id}/${userId}`
        );
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

  const { mutate, isLoading } = useMutation({
    /* eslint-disable @typescript-eslint/no-explicit-any */
    mutationFn: (data: any) => {
      if (isInFav?.status) {
        return deleteData(`/fav/${productDetails?._id}`);
      } else {
        return createData({ endpoints: "/fav", userData: data });
      }
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ message, status: "success" });
      refetch();
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data.message, status: "error" });
    },
  });

  const handleSelect = () => {};

  const handleFav = () => {
    const data = {
      userId,
      productId: productDetails?._id,
      productImage: productDetails?.heroImage,
      productName: productDetails?.name,
      productPrice: productDetails?.amount,
      productType: productDetails?.productType,
      productCategory: productDetails?.category,
    };
    mutate(data);
  };

  const handleAddToBag = () => {};

  return (
    <React.Fragment>
      <ProductInfoData
        setAboutProduct={setAboutProduct}
        handleAddToBag={handleAddToBag}
        handleFav={handleFav}
        handleSelect={handleSelect}
        productDetails={productDetails}
        isLoading={isLoading}
        isInFav={isInFav}
      />

      {aboutProduct && (
        <Modal isOpen="isOpen" onClose={() => setAboutProduct(undefined)}>
          <ModalHeader
            name="Product Details"
            onClose={() => setAboutProduct(undefined)}
          />
          <ProductAboutModal data={aboutProduct} />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ProductInfo;
