import Cart from "../Models/Cart.js";
import { createError } from "../utils/utility.js";

export const createCart = async (req, res, next) => {
  try {
    const newCart = new Cart(req.body);
    await newCart.save();

    res.status(201).json(newCart);
  } catch (error) {
    next(error);
  }
};

export const getCarts = async (req, res, next) => {
  const id = req.params.id;
  try {
    const cartData = await Cart.find({ userId: id });
    res.status(200).json(cartData);
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  const { userId, id } = req.params;
  try {
    const cartData = await Cart.findOne({ userId, productId: id });
    res.status(200).json(cartData);
  } catch (error) {
    next(error);
  }
};

export const deleteCart = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Cart.findByIdAndDelete(id);
    res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Cart.findByIdAndUpdate(id, { $inc: { quantity: 1 } });
    res.status(200).json({ status: true });
  } catch (error) {
    next(error);
  }
};
