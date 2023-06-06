import Home from "../Models/Home.js";

export const createHomeData = async (req, res, next) => {
  try {
    const homeData = new Home(req.body);
    await homeData.save();

    res.status(201).json({ message: "Home data created successfully" });
  } catch (error) {
    next(error);
  }
};

export const getHomeData = async (req, res, next) => {
  try {
    const homedData = await Home.find();
    res.status(200).json(homedData);
  } catch (error) {
    next(error);
  }
};

export const updateHomeData = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Home.findByIdAndUpdate(id, { $set: req.body });
    res.status(200).json({ message: "Home data updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteHomeData = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Home.findByIdAndDelete(id);
    res.status(200).json({ message: "Home Data successfully deleted" });
  } catch (error) {
    next(error);
  }
};
