import React, { useState } from "react";
import { Product, AppError, Cart } from "../../interfaces/interface";
import { Modal } from "../Modal/Modal";
import ModalHeader from "../Modal/ModalHeader";
import ProductAboutModal from "./ProductAboutModal";
import { useMutation, useQuery } from "react-query";
import { createData, deleteData, getData } from "../../api/api";
import { getLocalDataArray, getLocalData } from "../../utils/data";
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
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

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

  const handleAddToBag = () => {
    let cartData: Cart[] = getLocalDataArray("nikeCart");
    if (!selectedSize) return setError("Please select a size");

    if (!productDetails) return;

    const data: Cart = {
      productImage: productDetails?.heroImage,
      productName: productDetails?.name,
      productCategory: productDetails?.category,
      productType: productDetails?.productType,
      productColor: productDetails?.color,
      productId: productDetails?._id,
      productPrice: productDetails?.amount,
      quantity: 1,
      selectSize: productDetails?.size,
      size: selectedSize,
    };

    cartData = cartData.reduce((acc, item) => {
      if (item.productId === data.productId) {
        item.quantity++;
        data.quantity = item.quantity;
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as Cart[]);

    localStorage.setItem("nikeCart", JSON.stringify([data, ...cartData]));
  };

  return (
    <React.Fragment>
      <ProductInfoData
        setAboutProduct={setAboutProduct}
        handleAddToBag={handleAddToBag}
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
