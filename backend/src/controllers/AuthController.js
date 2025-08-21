import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import generateToken from "../utils/generateToken.js";

// đăng ký user mới
// POST api/v1/auth/register
export const register = async (req, res) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    // Kiểm tra xem username đã được sử dụng hay chưa
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username đã được sử dụng" });
    }
    // Kiểm tra xem email đã được sử dụng hay chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Người dùng đã tồn tại" });
    }

    // Kiểm tra các trường bắt buộc
    if (!firstname || !lastname || !username || !email || !password) {
      return res.status(400).json({ message: "Tất cả các trường là bắt buộc" });
    }

    const userData = {
      firstname,
      lastname,
      username,
      email,
      password: hashPassword,
    };

    const newUser = new User(userData);
    await newUser.save();

    res.status(201).json({ user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Lỗi không đăng ký được người dùng mới",
      error: error.message,
    });
  }
};

// đăng nhập user
// POST api/v1/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // kiểm tra các trường bắt buộc (chưa làm)

    // kiểm tra tài khoản user có tồn tại hay không
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    // kiểm tra mật khẩu user
    if (!verifyPassword) {
      return res
        .status(400)
        .json({ message: "Mật khẩu không đúng, vui lòng nhập lại" });
    }
    // tạo token
    const token = generateToken(user._id);
    // dữ liệu trả về sau khi đăng nhập thành công

    const userData = {
      userId: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      role: user.role,
    };

    // responseData json
    const responseData = {
      success: true,
      message: "Đăng nhập thành công",
      token: token,
      user: userData,
    };
    console.log("userData: ", responseData);

    // trả về dữ liệu dạng json user
    res.status(200).json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
      error: error.message,
    });
  }
};

//
export const getCurrentUser = async (req, res) => {
  try {
    // req.user đã được middleware protect gán
    if (!req.user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    res.status(200).json({ user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
