import mongoose from "mongoose";
import slugify from "slugify";

const ProductsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productType: {
      type: String,
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
    aboutProduct: {
      type: String,
      required: true,
    },
    productInformation: {
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
    popular: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

ProductsSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true, trim: true });
  }

  next();
});

export default mongoose.model("Products", ProductsSchema);
