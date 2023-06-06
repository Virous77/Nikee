import React, { useState } from "react";
import { createData } from "../../api/api";
import { useMutation } from "react-query";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError } from "../../interfaces/interface";
import SingleImage from "./SingleImage";
import CommonInput from "./CommonInput";
import styles from "./Home.module.scss";
import { getLocalData } from "../../utils/data";

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
  const userId = getLocalData("nike");
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

  const handleCreateData = () => {
    mutate({ userId, ...homeData });
  };

  return (
    <section className={styles.create}>
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
          titleValue={homeData.homeHero.title}
          descValue={homeData.homeHero.description}
          onDesc={(e: string) =>
            setHomeData({
              ...homeData,
              homeHero: { ...homeData.homeHero, description: e },
            })
          }
          onTitle={(e: string) =>
            setHomeData({
              ...homeData,
              homeHero: { ...homeData.homeHero, title: e },
            })
          }
        />

        <hr />

        <div className={styles.ahead}>
          <h2>Nike Ahead</h2>

          <div className={styles["ahead-main"]}>
            <h3>Men</h3>

            <div>
              <fieldset>
                <input
                  type="text"
                  placeholder="Title"
                  value={homeData.nikeAhead.men.title}
                  onChange={(e) =>
                    setHomeData({
                      ...homeData,
                      nikeAhead: {
                        ...homeData.nikeAhead,
                        men: {
                          ...homeData.nikeAhead.men,
                          title: e.target.value,
                        },
                      },
                    })
                  }
                />
              </fieldset>

              <SingleImage
                uploadedImage={(e: string) =>
                  setHomeData({
                    ...homeData,
                    nikeAhead: {
                      ...homeData.nikeAhead,
                      men: { ...homeData.nikeAhead.men, image: e },
                    },
                  })
                }
                title="Men"
                setImage={(e: string) => setImages({ ...images, nikeMen: e })}
                image={images.nikeMen}
              />
            </div>
          </div>

          <div>
            <h3>Women</h3>

            <div>
              <fieldset>
                <input
                  type="text"
                  placeholder="Title"
                  value={homeData.nikeAhead.women.title}
                  onChange={(e) =>
                    setHomeData({
                      ...homeData,
                      nikeAhead: {
                        ...homeData.nikeAhead,
                        women: {
                          ...homeData.nikeAhead.women,
                          title: e.target.value,
                        },
                      },
                    })
                  }
                />
              </fieldset>

              <SingleImage
                uploadedImage={(e: string) =>
                  setHomeData({
                    ...homeData,
                    nikeAhead: {
                      ...homeData.nikeAhead,
                      women: { ...homeData.nikeAhead.women, image: e },
                    },
                  })
                }
                title="Men"
                setImage={(e: string) => setImages({ ...images, nikeWomen: e })}
                image={images.nikeWomen}
              />
            </div>
          </div>
        </div>

        <hr />

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
          titleValue={homeData.nikeAir.title}
          descValue={homeData.nikeAir.description}
          onDesc={(e: string) =>
            setHomeData({
              ...homeData,
              nikeAir: { ...homeData.nikeAir, description: e },
            })
          }
          onTitle={(e: string) =>
            setHomeData({
              ...homeData,
              nikeAir: { ...homeData.nikeAir, title: e },
            })
          }
        />

        <button disabled={isLoading} onClick={handleCreateData}>
          {isLoading ? "Creating..." : "Save"}
        </button>
      </form>
    </section>
  );
};

export default CreateHomeData;
