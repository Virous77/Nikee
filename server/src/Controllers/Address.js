import Address from "../Models/Address.js";
import { createError } from "../utils/utility.js";
import User from "../Models/User.js";

export const createAddress = async (req, res, next) => {
  const { address, landmark, addressType, state, city, postalCode, userId } =
    req.body;

  if (
    !address ||
    !landmark ||
    !addressType ||
    !state ||
    !city ||
    !postalCode ||
    !userId
  ) {
    return next(
      createError({ status: 400, message: "All fields should be filled" })
    );
  }

  const user = await User.findById(userId);

  if (!user)
    return next(
      createError({
        status: 400,
        message: "Something went wrong, Login again and try",
      })
    );

  try {
    const newAddress = new Address(req.body);
    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    next(error);
  }
};
