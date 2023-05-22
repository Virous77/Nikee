import mongoose from "mongoose";
import slugify from "slugify";

const SneakersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    size: {
      type: ["string"],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    sale: {
      type: Boolean,
      default: false,
    },
    heroImage: {
      type: String,
      required: true,
    },
    images: {
      type: ["string"],
      required: true,
    },
    aboutSneaker: {
      type: String,
      required: true,
    },
    sneakerInformation: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    brands: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

SneakersSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true, trim: true });
  }

  next();
});

export default mongoose.model("Sneakers", SneakersSchema);
