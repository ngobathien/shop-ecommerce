import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import bodyParser from "body-parser";

//
const port = process.env.PORT || 3000;

// khởi tạo ứng dụng Express
const app = express();

app.use(express.json());
// sử dụng body-parser để phân tích dữ liệu JSON trong request body
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// sử dụng cors để cho phép tất cả các nguồn gốc truy cập vào API
app.use(cors());

// connect to MongoDB
connectDB();

// routes http://localhost:3000/api/v1/
const api = process.env.API_URL;
// console.log(api);
app.use(`${api}/`, router);

// ====================test ví dụ========================
// import bcrypt from "bcrypt";

// const password = "123456";

// // ✅ Hash
// const hashed = await bcrypt.hash(password, 10);
// console.log("Hash:", hashed);

// // ✅ Compare
// const isValid = await bcrypt.compare("123456", hashed);
// console.log("Compare result:", isValid);

// ============================================

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
});
