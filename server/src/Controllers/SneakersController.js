import Sneakers from "../Models/Sneakers.js";
import { createError } from "../utils/utility.js";
import { uploadImage } from "../utils/imageUpload.js";
import { deleteImages } from "../utils/imageUpload.js";

export const createSneaker = async (req, res, next) => {
  const {
    productCategory: category,
    productsType: sneakerType,
    productSize: size,
    imageR: heroImage,
    imagesR,
    images,
    productInformation: sneakerInformation,
    aboutProduct: aboutSneaker,
    ...rest
  } = req.body;

  try {
    const heroImg = await uploadImage([heroImage]);
    const heroImgs = await uploadImage(imagesR);
    const getImage = heroImgs.map((li) => li.secure_url);

    const data = {
      sneakerType,
      aboutSneaker,
      sneakerInformation,
      size,
      heroImage: heroImg[0].secure_url,
      images: getImage,
      ...rest,
    };

    const createNewSneaker = new Sneakers(data);
    await createNewSneaker.save();

    res.status(201).json({ message: "Sneaker created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getSneakers = async (req, res, next) => {
  try {
    const sneakers = await Sneakers.find();
    res.status(200).json(sneakers);
  } catch (error) {
    next(error);
  }
};

export const getSneaker = async (req, res, next) => {
  const { name } = req.params;
  try {
    const sneaker = await Sneakers.findOne({ slug: name });

    if (!sneaker)
      return next(
        createError({ message: "Sneaker don't exists anymore", status: 404 })
      );

    res.status(200).json(sneaker);
  } catch (error) {
    next(error);
  }
};

export const getSneakerIconic = async (req, res, next) => {
  try {
    const sneaker = await Sneakers.find().limit(10);
    res.status(200).json(sneaker);
  } catch (error) {
    next(error);
  }
};

export const getPaginateSneaker = async (req, res, next) => {
  const { pageNumber, pageSize } = req.params;
  try {
    const skipDocuments = (+pageNumber - 1) * +pageSize;

    const totalSneaker = +pageNumber === 1 && (await Sneakers.countDocuments());
    const query = await Sneakers.find().skip(skipDocuments).limit(pageSize);

    res.status(200).json({ total: totalSneaker, data: query });
  } catch (error) {
    next(error);
  }
};

export const updateSneaker = async (req, res, next) => {
  const { id } = req.params;
  const {
    productCategory: category,
    productsType: sneakerType,
    productSize: size,
    imageR: heroImage,
    imagesR,
    images,
    productInformation: sneakerInformation,
    aboutProduct: aboutSneaker,
    ...rest
  } = req.body;

  try {
    const newImage = imagesR.filter((image) => !image.includes("https"));
    const keepImages = imagesR.filter((image) => image.includes("https"));
    const saveImageInDb = images
      .filter((img) => !img.includes("blob"))
      .filter((img) => {
        return keepImages.filter((i) => i === img);
      });

    const heroImgs = await uploadImage(newImage);
    const getImage = heroImgs.map((li) => li.secure_url);

    const data = {
      sneakerType,
      aboutSneaker,
      sneakerInformation,
      size,
      category,
      images: [...saveImageInDb, ...getImage],
      ...rest,
    };

    await Sneakers.findByIdAndUpdate(id, { $set: data });
    res.status(200).json({ message: "Sneaker updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Sneakers.findById(id);
    const images = [product.heroImage, ...product.images];
    await deleteImages(images);
    const deleteSneaker = await Sneakers.findByIdAndDelete(id);

    if (deleteSneaker) {
      return res.status(200).json({ message: "Sneaker successfully deleted" });
    } else {
      return res.status(400).json({ message: "Sneaker don't exists." });
    }
  } catch (error) {
    next(error);
  }
};

export const relatedSneakers = async (req, res, next) => {
  const { type } = req.params;

  console.log(type);

  try {
    const relatedSneaker = await Sneakers.find({ brands: type })
      .select("name heroImage amount slug -_id")
      .sort({ popular: -1 })
      .limit(10);

    console.log(relatedSneaker);

    res.status(200).json(relatedSneaker);
  } catch (error) {
    next(error);
  }
};
