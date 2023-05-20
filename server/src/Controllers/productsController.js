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
  const slug = req.params.slug;

  try {
    const product = await Products.findOne({ slug });
    if (!product)
      return next(createError({ status: 400, message: "Product not exists" }));

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductByType = async (req, res, next) => {
  const type = req.params.type;
  try {
    const queryData = await Products.find({ productType: type });
    res.status(200).json(queryData);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  const type = req.params.type;
  const { sort, price, color, brands } = req.query;
  const breakPrice = price && price.split("-");

  try {
    const pureProducts = await Products.find({
      productType: type,
    });
    let products = await Products.find({
      productType: type,
      color: color || { $exists: true },
      brands: brands || { $exists: true },
      featured: sort === "featured" ? true : { $exists: true },
      amount: { $gt: +breakPrice?.[0] || 0, $lt: +breakPrice?.[1] || 100000 },
    }).sort({
      amount: sort === "high-low" ? -1 : 1,
    });

    if (sort === "newest") {
      products = products.sort((a, b) => b.createdAt - a.createdAt);
    }

    const brandsGet = pureProducts.map((product) => product.brands);
    const uniqueBrands = [...new Set(brandsGet)];
    const colorGet = pureProducts.map((product) => product.color);
    const uniqueColor = [...new Set(colorGet)];
    res
      .status(200)
      .json({ data: products, brands: uniqueBrands, color: uniqueColor });
  } catch (error) {
    next(error);
  }
};
