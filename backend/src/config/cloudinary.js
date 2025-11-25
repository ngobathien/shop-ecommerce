import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadToCloudinary = async (path, folder) => {
  try {
    const data = await cloudinary.uploader.upload(path, { folder: folder });

    console.log(data.secure_url); // link ảnh
    console.log(data.public_id);
    return { url: data.secure_url, publicId: data.public_id };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
