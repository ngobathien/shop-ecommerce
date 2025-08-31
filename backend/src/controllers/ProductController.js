import mongoose from "mongoose";
import Product from "../models/Product.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

// lấy tất cả sản phẩm
// GET api/v1/products/getAllProduct
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// lấy sản phẩm theo id
// GET api/v1/products/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(500).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json({ product });
  } catch (error) {}
};

// tạo sản phẩm mới
// POST api/v1/products/
export const createProduct = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    // nhận dữ liệu từ client gửi lên
    const {
      nameProduct,
      description,
      category,
      size,
      color,
      price,
      countInStock,
    } = req.body;

    const files = req.files;

    // kiểm tra có ảnh hay không
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Phải có ít nhất 1 ảnh" });
    }

    // kiểm tra nếu chỉ cho phép tối đa 5 ảnh
    if (files.length > 5) {
      return res.status(400).json({ message: "Phải có ít nhất 1 ảnh" });
    }

    // Upload tất cả ảnh lên Cloudinary
    const uploadImages = [];
    for (let file of files) {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString(
        "base64"
      )}`;
      const result = await uploadToCloudinary(base64, "products");
      uploadImages.push({
        url: result.url,
        publicId: result.publicId,
      });
    }

    // Kiểm tra xem tên sản phẩm có hay không
    if (!nameProduct) {
      return res.status(400).json({ message: "Tên sản phẩm là bắt buộc" });
    }

    const productData = {
      nameProduct,
      description,
      category,
      size,
      color,
      price,
      images: uploadImages, // lưu link cloudinary, không lưu base64
      countInStock,
    };

    const newProduct = new Product(productData);

    await newProduct.save();

    // Trả về thông tin sản phẩm mới tạo
    res.status(201).json({
      message: "Sản phẩm đã được tạo thành công",
      product: newProduct,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// cập nhật sản phẩm
// PUT api/v1/products/:id
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nameProduct,
      description,
      category,
      size,
      color,
      price,
      images,
      countInStock,
    } = req.body;

    // Kiểm tra xem sản phẩm có tồn tại không
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(400).json({ message: "Sản phẩm không tồn tại" });
    }

    // Kiểm tra xem tên sản phẩm có hay không
    if (!nameProduct) {
      return res.status(400).json({ message: "Tên sản phẩm là bắt buộc" });
    }
    const productData = {
      nameProduct,
      description,
      category,
      size,
      color,
      price,
      images,
      countInStock,
    };

    const updateProduct = await Product.findByIdAndUpdate(id, productData);

    res.status(201).json({
      massage: "Cập nhật sản phẩm thành công",
      product: updateProduct,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Lỗi khi cập nhật sản phẩm", error: error });
  }
};

// xóa sản phẩm
// DELETE api/v1/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //tìm và  kiểm tra xem sản phẩm có tồn tại không để xóa
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message:
          "Không tìm thấy sản phẩm để xóa hoặc chưa xóa sản phẩm thành công",
      });
    }
    res.status(200).json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi khi xóa sản phẩm", error: error });
  }
};
