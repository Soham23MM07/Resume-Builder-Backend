import cloudinary from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
console.log(process.env.PORT);
console.log(process.env.CLOUD_NAME);
console.log(process.env.API_KEY);
console.log(process.env.API_SECRET);

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const uploadtocloudinary = async (localfilePath) => {
  console.log(localfilePath);

  try {
    if (!localfilePath) return null;

    const response = await cloudinary.v2.uploader.upload(localfilePath, {
      folder: "resume-builder-upload",
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary", response.secure_url);

    await fs.promises.unlink(localfilePath);

    return response.secure_url;
  } catch (error) {
    console.log("Error uploading file to Cloudinary:", error.message);
    console.log("Cloudinary erro details:", error);
    await fs.promises.unlink(localfilePath);
    return null;
  }
};

const deletefromcloudniary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Cloudinary file deleted:", result);
  } catch (error) {
    console.log("Error deleting from Cloudinary:", error.message);
    return null;
  }
};

export { uploadtocloudinary, deletefromcloudniary };
