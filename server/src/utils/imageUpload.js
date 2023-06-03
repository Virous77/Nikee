import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dw6wav4jg",
  api_key: "318471794731225",
  api_secret: "yzINKv-O2NsXbL5pR67ld9HkOaA",
  secure: true,
});

export const uploadImage = async (image) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const res = await Promise.all(
      image.map((img) => cloudinary.uploader.upload(img, options))
    );

    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteImages = async (imageUrls) => {
  try {
    await Promise.all(
      imageUrls.map((imageUrl) => {
        const publicId = cloudinary
          .url(imageUrl)
          .split("/")
          .pop()
          .split(".")[0];
        return cloudinary.uploader.destroy(publicId);
      })
    );
  } catch (error) {
    console.error(error);
  }
};
