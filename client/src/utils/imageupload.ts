const cloud_name = import.meta.env.VITE_CLOUD;
const cloud_preset = import.meta.env.VITE_PRESET;

export const uploadImage = async (image: File) => {
  let imageURL;
  try {
    if (image) {
      const uploadImage = new FormData();

      uploadImage.append("file", image);
      uploadImage.append("cloud_name", cloud_name);
      uploadImage.append("upload_preset", cloud_preset);

      //save image to cloudinary
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "post",
          body: uploadImage,
        }
      );
      const imgData = await res.json();
      imageURL = imgData?.url?.toString();
    }

    return imageURL;
  } catch (error) {
    console.log(error);
  }
};
