import Sneakers from "../Models/Sneakers.js";
import { createError } from "../utils/utility.js";
import { uploadImage } from "../utils/imageUpload.js";

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

  const { name, color, brands, amount } = rest;

  try {
    if (
      !sneakerType ||
      !amount ||
      !name ||
      !imagesR.length > 0 ||
      !color ||
      !brands ||
      !sneakerInformation ||
      !aboutSneaker ||
      !heroImage ||
      !size.length > 3
    ) {
      return next(
        createError({
          status: 400,
          message: "Required fields cannot be empty ",
        })
      );
    }

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
  const { id } = req.params;
  try {
    const sneaker = await Sneakers.findById(id);

    if (!sneaker)
      return next(
        createError({ message: "Sneaker don't exists anymore", status: 404 })
      );

    res.status(200).json(sneaker);
  } catch (error) {
    next(error);
  }
};
