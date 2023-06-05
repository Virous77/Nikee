import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema({
  homeHero: {
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  nikeAhead: {
    men: {
      image: {
        type: String,
      },
      title: {
        type: String,
      },
    },
    women: {
      image: {
        type: String,
      },
      title: {
        type: String,
      },
    },
  },
  nikeAir: {
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },
});

export default mongoose.model("Home", HomeSchema);
