import Products from "../Models/Products.js";
import { createError } from "../utils/utility.js";
import { uploadImage } from "../utils/imageUpload.js";

export const createProduct = async (req, res, next) => {
  const {
    productCategory: category,
    productsType: productType,
    productSize: size,
    imageR: heroImage,
    imagesR,
    images,
    ...rest
  } = req.body;

  const { name, color, brands, amount, productInformation, aboutProduct } =
    rest;

  try {
    if (
      !category ||
      !productType ||
      !amount ||
      !name ||
      !imagesR.length > 0 ||
      !color ||
      !brands ||
      !productInformation ||
      !aboutProduct ||
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
      category,
      productType,
      size,
      heroImage: heroImg[0].secure_url,
      images: getImage,
      ...rest,
    };

    const createNewProduct = new Products(data);
    await createNewProduct.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    const product = await Products.findById(id);
    if (!product)
      return next(createError({ status: 400, message: "Product not exists" }));

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
