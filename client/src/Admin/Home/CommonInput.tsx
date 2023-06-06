import React from "react";
import SingleImage from "./SingleImage";

type CommonInputType = {
  images: string;
  uploadImage: (e: string) => void;
  setImage: (e: string) => void;
  title: string;
};

const CommonInput: React.FC<CommonInputType> = ({
  images,
  uploadImage,
  setImage,
  title,
}) => {
  return (
    <div>
      <h2>{title}</h2>

      <div>
        <div>
          <fieldset>
            <input type="text" placeholder="Title" />
          </fieldset>

          <fieldset>
            <input type="text" placeholder="Description" />
          </fieldset>
        </div>
        <SingleImage
          image={images}
          uploadedImage={(e: string) => uploadImage(e)}
          setImage={(e: string) => setImage(e)}
          title={title}
        />
      </div>
    </div>
  );
};

export default CommonInput;
