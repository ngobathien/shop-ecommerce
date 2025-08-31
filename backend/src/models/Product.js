import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    nameProduct: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    // chưa làm tới
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Category",
    //   required: true,
    // },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    price: {
      type: Number,
    },

    images: [
      {
        // các tham số của clouddinary
        publicId: { type: String, required: true },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    countInStock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
