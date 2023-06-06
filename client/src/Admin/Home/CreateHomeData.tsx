import React, { useState } from "react";
import { createData } from "../../api/api";
import { useMutation } from "react-query";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError } from "../../interfaces/interface";
import SingleImage from "./SingleImage";
import CommonInput from "./CommonInput";

type CreateHomeDataType = {
  refetch: () => void;
  setShowCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateHomeData: React.FC<CreateHomeDataType> = ({
  refetch,
  setShowCreate,
}) => {
  const initialState = {
    homeHero: {
      image: "",
      title: "",
      description: "",
    },
    nikeAhead: {
      men: {
        image: "",
        title: "",
      },
      women: {
        image: "",
        title: "",
      },
    },
    nikeAir: {
      image: "",
      title: "",
      description: "",
    },
  };
  const [homeData, setHomeData] = useState(initialState);
  const { handleSetNotification } = useGlobalContext();
  const [images, setImages] = useState({
    heroImage: "",
    nikeMen: "",
    nikeWomen: "",
    nikeAir: "",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => {
      return createData({ userData: data, endpoints: "/home" });
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ message, status: "success" });
      refetch();
      setShowCreate(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleCreateData = () => {};

  return (
    <section>
      <form onSubmit={(e) => e.preventDefault()}>
        <CommonInput
          uploadImage={(e: string) =>
            setHomeData({
              ...homeData,
              homeHero: { ...homeData.homeHero, image: e },
            })
          }
          setImage={(e: string) => setImages({ ...images, heroImage: e })}
          title="Home Hero"
          images={images.heroImage}
        />

        <div>Cool</div>

        <CommonInput
          uploadImage={(e: string) =>
            setHomeData({
              ...homeData,
              nikeAir: { ...homeData.nikeAir, image: e },
            })
          }
          setImage={(e: string) => setImages({ ...images, nikeAir: e })}
          title="Nike Air"
          images={images.nikeAir}
        />
      </form>
    </section>
  );
};

export default CreateHomeData;
