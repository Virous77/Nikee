import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.IMAGE_API_KEY,
  api_secret: process.env.IMAGE_API_SECRET,
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
    throw error;
  }
};
