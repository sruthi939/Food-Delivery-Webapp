import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (filePath, folder = "foods") => {
    try {
        const result = await cloudinary.uploader.upload(filePath, { folder });
        return result.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return null;
    }
};
