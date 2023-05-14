import React, { useState } from "react";
import { Product, AppError } from "../../interfaces/interface";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import ProductAboutModal from "./ProductAboutModal";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { getLocalData } from "../../utils/data";
import { useGlobalContext } from "../../store/GlobalContext";
import ProductInfoData from "./ProductInfoData";
import useFav from "../../hooks/useFav";
import useCart from "../../hooks/useCart";

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
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");
  const userId = getLocalData("nike");
  const { handleSetNotification } = useGlobalContext();
  const { handleAddToBag } = useCart();

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

  const { mutate, isLoading } = useFav({
    isInFav: isInFav?.status,
    refetch,
    id: productDetails?._id,
  });

  const handleSelect = (size: string) => {
    setError("");
    if (selectedSize === size) {
      setSelectedSize("");
    } else {
      setSelectedSize(size);
    }
  };

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

  return (
    <React.Fragment>
      <ProductInfoData
        setAboutProduct={setAboutProduct}
        handleAddToBag={() =>
          handleAddToBag({ productDetails, selectedSize, setError })
        }
        handleFav={handleFav}
        handleSelect={(size) => handleSelect(size)}
        productDetails={productDetails}
        isLoading={isLoading}
        isInFav={isInFav}
        selectedSize={selectedSize}
        error={error}
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
