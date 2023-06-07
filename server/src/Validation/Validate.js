import joi from "joi";

export const AuthValidate = async (req, res, next) => {
  try {
    const schema = joi
      .object({
        name: joi.string().trim().required(),
        email: joi.string().trim().required(),
        password: joi.string().trim().required(),
        birth: joi.string().trim().required(),
        gender: joi.string().trim().required(),
        country: joi.string().trim().required(),
      })
      .options({ stripUnknown: true });

    const result = await schema.validateAsync(req.body);
    if (result) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const ProductValidate = async (req, res, next) => {
  try {
    const schema = joi
      .object({
        name: joi.string().trim().required(),
        amount: joi.number().required().min(10),
        size: joi.array().required().min(3),
        imageR: joi.string().trim().required(),
        imagesR: joi.array().required().min(3),
        productInformation: joi.string().trim().required(),
        aboutProduct: joi.string().trim().required(),
        productCategory: joi.string().trim().required(),
        productsType: joi.string().trim().required(),
        color: joi.string().trim().required(),
        brands: joi.string().trim().required(),
      })
      .options({ stripUnknown: true });

    const result = await schema.validateAsync(req.body);
    if (result) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const ReviewValidate = async (req, res, next) => {
  try {
    const schema = joi
      .object({
        userId: joi.string().trim().required(),
        productId: joi.string().trim().required(),
        rating: joi.number().required().min(0.5),
        message: joi.string().trim().required(),
        userName: joi.string().trim().required(),
      })
      .options({ stripUnknown: true });

    const result = await schema.validateAsync(req.body);
    if (result) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const CouponValidate = async (req, res, next) => {
  try {
    const schema = joi
      .object({
        coupon: joi.string().trim().required(),
        validFrom: joi.string().trim().required(),
        validTill: joi.string().trim().required(),
        discountPercent: joi.number().required().min(5),
        userId: joi.string().trim().required(),
      })
      .options({ stripUnknown: true });

    const result = await schema.validateAsync(req.body);
    if (result) {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export const AddressValidate = async (req, res, next) => {
  try {
    const schema = joi.object({
      address: joi.string().trim().required(),
      landmark: joi.string().trim().required(),
      addressType: joi.string().trim().required(),
      state: joi.string().trim().required(),
      city: joi.string().trim().required(),
      postalCode: joi.number().required(),
      userId: joi.string().trim().required(),
    });
  } catch (error) {
    next(error);
  }
};
