import React, { useState } from "react";
import styles from "./Home.module.scss";
import { DetailsModalType } from "./DetailsModal";
import SingleImage from "./SingleImage";
import { useMutation } from "react-query";
import { updateData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError } from "../../interfaces/interface";
import { getLocalData } from "../../utils/data";
import { DetailsType } from "./HomeData";

type updateType = {
  id: string;
  updateData: any;
};

type EditHomeDataType = {
  setEdit: React.Dispatch<React.SetStateAction<DetailsType | undefined>>;
};

const EditHomeData: React.FC<DetailsModalType & EditHomeDataType> = ({
  data,
  setDetails,
  setEdit,
  refetch,
}) => {
  const [editState, setEditState] = useState({
    image: data.data.image,
    description: data.data.description,
    title: data.data.title,
  });
  const [currentImage, setCurrentImage] = useState(data.data.image);
  const { handleSetNotification } = useGlobalContext();
  const userId = getLocalData("nike");

  const { mutate: updateMutate, isLoading } = useMutation({
    mutationFn: (data: updateType) => {
      return updateData({
        endpoints: `/home/${data.id}`,
        userData: data.updateData,
      });
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ message, status: "success" });
      setDetails(undefined);
      refetch();
    },
  });

  const handleUpdate = () => {
    const currentEditData =
      data.name === "Home Hero"
        ? "homeHero"
        : data.name === "Nike Air"
        ? "nikeAir"
        : "";

    const currentEditDataAhead = !currentEditData
      ? data.name === "Men"
        ? "men"
        : "women"
      : "";

    const type = !currentEditData
      ? currentEditDataAhead === "men"
        ? "women"
        : "men"
      : "men";

    if (currentEditDataAhead) {
      delete data.homeData.nikeAhead[currentEditDataAhead];
      const updateData = {
        userId,
        ...data.homeData,
        nikeAhead: {
          [type]: {
            ...data.homeData.nikeAhead[type],
          },
          [currentEditDataAhead]: {
            ...editState,
          },
        },
      };
      updateMutate({ id: data.data._id, updateData });
    } else {
      if (currentEditData) {
        delete data.homeData[currentEditData];

        const updateData = {
          userId,
          ...data.homeData,
          [currentEditData]: {
            ...editState,
          },
        };
        updateMutate({ id: data.data._id, updateData });
      }
    }
  };

  return (
    <section className={styles["edit-main"]}>
      <div>
        <SingleImage
          uploadedImage={(e: string) =>
            setEditState({ ...editState, image: e })
          }
          setImage={(e: string) => setCurrentImage(e)}
          image={currentImage}
          title={data.name}
        />

        <div className={styles["edit-input"]}>
          <fieldset>
            <input
              type="text"
              placeholder="Title"
              value={editState.title}
              onChange={(e) =>
                setEditState({ ...editState, title: e.target.value })
              }
            />
          </fieldset>

          {editState.description && (
            <fieldset>
              <input
                type="text"
                placeholder="Description"
                value={editState.description}
                onChange={(e) =>
                  setEditState({ ...editState, description: e.target.value })
                }
              />
            </fieldset>
          )}
        </div>

        <div className={styles["edit-action"]}>
          <button onClick={() => setEdit(undefined)}>Cancel</button>
          <button onClick={handleUpdate} className={styles["submit-button"]}>
            {isLoading ? "Updating.." : "Update"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default EditHomeData;
