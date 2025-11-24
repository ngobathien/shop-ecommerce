import Category from "../models/Category.js";

// Lấy tất cả danh mục
export const getCategories = async (req, res) => {
  try {
  } catch (error) {}
};

// Lấy chi tiết danh mục
export const getCategoryById = async (req, res) => {
  try {
  } catch (error) {}
};

// Tạo mới danh mục
export const createCategory = async (req, res) => {
  try {
    // nhận dữ liệu từ client
    const { name } = req.body;

    // kiểm tra category này có để trống không
    if (!name || name.trim() === "") {
      return res
        .status(400)
        .json({ status: false, message: "Thiếu tên danh mục, vui lòng nhập" });
    }

    // kiểm tra category này có tồn tại chưa
    const existingCatergory = await Category.findOne({ name });

    if (existingCatergory) {
      return res
        .status(400)
        .json({ status: false, message: "Danh mục đã tồn tại" });
    }

    // lưu vào database
    const category = new Category({
      name,
    });

    await category.save();

    // trả về phản hồi cho client
    res
      .status(201)
      .json({ status: true, message: "Tạo danh mục mới thành công", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật danh mục
export const updateCategory = async (req, res) => {
  try {
  } catch (error) {}
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
  try {
  } catch (error) {}
};
