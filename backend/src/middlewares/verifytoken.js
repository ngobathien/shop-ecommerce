import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Người dùng không tồn tại." });
      }
      next();
    } catch (error) {
      console.error("Lỗi xác thực token:", error);
      return res
        .status(401)
        .json({ message: "Token không hợp lệ hoặc hết hạn." });
    }
  } else {
    // Trả về lỗi ngay nếu không có Authorization header
    return res
      .status(401)
      .json({ message: "Không có token, không được phép." });
  }
};

export default protect;
