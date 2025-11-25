import mongoose from "mongoose";
import Category from "../models/Category.js";

// Lấy tất cả danh mục
export const getCategories = async (req, res) => {
  try {
    const category = await Category.find();

    res.status(200).json({
      success: true,
      message: "Lấy tất cả danh mục thành công",
      category: category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy tất cả danh mục",
    });
  }
};

// Lấy chi tiết danh mục
export const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;

    // lấy data
    const category = await Category.findById(categoryId);

    if (!category) {
      return res
        .status(400)
        .json({ status: false, message: "Danh mục không tồn tại" });
    }

    // phản hồi client
    res.status(200).json({
      success: true,
      message: "Lấy tất cả danh mục thành công",
      category: category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy chi tiết danh mục",
    });
  }
};

// Tạo mới danh mục
export const createCategory = async (req, res) => {
  try {
    // nhận dữ liệu từ client
    const { name, description } = req.body;

    // kiểm tra category này có để trống không
    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ status: false, message: "Thiếu tên danh mục, vui lòng nhập" });
    }

    // kiểm tra tên category này có tồn tại chưa
    const existingNameCatergory = await Category.findOne({ name });

    if (existingNameCatergory) {
      return res
        .status(400)
        .json({ status: false, message: "Tên danh mục đã tồn tại" });
    }

    // lưu vào database
    const category = new Category({
      name,
      description,
    });

    await category.save();

    // trả về phản hồi cho client
    res
      .status(201)
      .json({ status: true, message: "Tạo danh mục mới thành công", category });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Lỗi khi lấy tất cả danh mục",
    });
  }
};

// Cập nhật danh mục
export const updateCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    console.log(categoryId, name);
    console.log(req.body);

    // check id hợp lệ
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "ID sản phẩm không hợp lệ",
      });
    }

    // Kiểm tra danh mục có tồn tại
    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Danh mục không tồn tại",
      });
    }

    // kiểm tra đầu vào
    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ status: false, message: "Thiếu tên danh mục" });
    }

    const existingNameCatergory = await Category.findOne({ name });

    if (existingNameCatergory) {
      return res
        .status(400)
        .json({ status: false, message: "Tên danh mục đã tồn tại" });
    }

    // data danh mục mới
    const categoryData = {
      name,
      description,
    };

    // kiểm tra danh mục có tồn tại không
    const category = await Category.findByIdAndUpdate(
      categoryId,
      categoryData,
      { new: true }
    );

    // trả về phản hồi cho client
    res.status(200).json({
      status: true,
      message: "Cập nhật danh mục thành công",
      category: category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Lỗi khi cập nhật danh mục",
    });
  }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    // kiểm tra danh mục có tồn tại không
    const existingCatergory = await Category.findByIdAndDelete(categoryId);

    if (!existingCatergory) {
      return res
        .status(400)
        .json({ status: false, message: "Danh mục không tồn tại" });
    }

    // phản hồi client
    res.status(200).json({
      success: true,
      message: "Xóa danh mục thành công",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Lỗi khi xóa danh mục",
    });
  }
};
