import mongoose from "mongoose";
import Product from "../models/Product.js";

class ProductController {
  // GET api/v1/products/getAllProduct
  async getAllProducts(req, res) {
    const products = await Product.find();

    res.status(200).json({ success: true, products });
  }

  async getProductById(req, res) {}

  async createProduct(req, res) {}

  async updateProduct(req, res) {}

  async deleteProduct(req, res) {}
}

export default new ProductController();
