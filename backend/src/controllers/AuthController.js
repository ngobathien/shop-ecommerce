import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class AuthController {
  // đăng ký user mới
  // POST api/v1/auth/register
  async register(req, res) {
    const { firstname, lastname, username, email, password } = req.body;

    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password,
    });
    res.status(201).json({ user: newUser });
  }

  // đăng nhập user
  // POST api/v1/auth/login
  async login(req, res) {}
}

export default new AuthController();
