import Products from "../Models/Products.js";
import { createError } from "../utils/utility.js";
import { uploadImage, deleteImages } from "../utils/imageUpload.js";

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

  try {
    const heroImg = await uploadImage([heroImage]);
    const heroImgs = await uploadImage(imagesR);
    const getImage = heroImgs.map((li) => li.secure_url);

    const data = {
      category,
      productType: productType.toLowerCase(),
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
  const { type, pageNumber, pageSize } = req.params;

  const { sort, price, color, brands, sale, category } = req.query;
  const breakPrice = price && price.split("-");

  try {
    const skipDocuments = (+pageNumber - 1) * +pageSize;

    const pureProducts = await Products.find({
      productType: type,
    });
    let query = {
      productType: type,
      sale: sale || { $exists: true },
      color: color || { $exists: true },
      brands: brands || { $exists: true },
      category: category || { $exists: true },
      featured: sort === "featured" ? true : { $exists: true },
      amount: { $gt: +breakPrice?.[0] || 0, $lt: +breakPrice?.[1] || 100000 },
    };

    let products = await Products.find(query)
      .sort({
        amount: sort === "high-low" ? -1 : 1,
      })
      .skip(skipDocuments)
      .limit(+pageSize);
    const totalLength = await Products.countDocuments(query);

    if (sort === "newest") {
      products = products.sort((a, b) => b.createdAt - a.createdAt);
    }

    const brandsGet = pureProducts.map((product) => product.brands);
    const uniqueBrands = [...new Set(brandsGet)];
    const colorGet = pureProducts.map((product) => product.color);
    const uniqueColor = [...new Set(colorGet)];
    res.status(200).json({
      data: products,
      brands: uniqueBrands,
      color: uniqueColor,
      total: totalLength,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProduct = async (req, res, next) => {
  const { pageNumber, pageSize } = req.params;

  try {
    const skipDocuments = (+pageNumber - 1) * +pageSize;

    const totalProduct =
      +pageNumber === 1 && (await Products.find({ featured: true })).length;
    const products = await Products.aggregate([{ $match: { featured: true } }])
      .skip(skipDocuments)
      .limit(+pageSize);

    res.status(200).json({ total: totalProduct, data: products });
  } catch (error) {
    next(error);
  }
};

export const getPopularProducts = async (req, res, next) => {
  try {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);

    const products = await Products.find({
      $or: [{ updatedAt: { $gte: tenDaysAgo } }, { category: "Shoes" }],
    })
      .select("name heroImage amount  slug -_id")
      .sort({ popular: -1 })
      .limit(10);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Products.find();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getPaginationProduct = async (req, res, next) => {
  const { pageNumber, pageSize } = req.params;

  try {
    const skipDocuments = (+pageNumber - 1) * +pageSize;

    const totalProduct = +pageNumber === 1 && (await Products.countDocuments());
    const query = await Products.find().skip(skipDocuments).limit(pageSize);

    res.status(200).json({ total: totalProduct, data: query });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    const images = [product.heroImage, ...product.images];
    await deleteImages(images);
    const deleteProduct = await Products.findByIdAndDelete(id);

    if (deleteProduct) {
      return res.status(200).json({ message: "Product successfully deleted" });
    } else {
      return res.status(400).json({ message: "Product don't exists." });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const {
    productCategory: category,
    productsType: productType,
    productSize: size,
    imagesR,
    images,
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
      category,
      productType,
      size,
      images: [...saveImageInDb, ...getImage],
      ...rest,
    };

    await Products.findByIdAndUpdate(id, { $set: data });
    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteImage = async (req, res, next) => {
  const { image } = req.body;
  try {
    if (!image)
      return next(createError({ status: 400, message: "image url missing" }));

    await deleteImages([image]);
    res.status(200).json({ message: "Image Successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const relatedProducts = async (req, res, next) => {
  const { type } = req.params;

  try {
    const relatedProducts = await Products.find({ category: type })
      .select("name heroImage amount slug -_id")
      .sort({ popular: -1 })
      .limit(10);

    res.status(200).json(relatedProducts);
  } catch (error) {
    next(error);
  }
};
