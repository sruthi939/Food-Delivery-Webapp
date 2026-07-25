import { v2 as cloudinary } from "cloudinary";

export const connectCloudinary = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "goldfork_cloud",
            api_key: process.env.CLOUDINARY_API_KEY || "1234567890",
            api_secret: process.env.CLOUDINARY_API_SECRET || "secret"
        });
        console.log("[Cloudinary] Configured successfully");
    } catch (error) {
        console.warn(`[Cloudinary Warning] Configuration failed: ${error.message}`);
    }
};

export default connectCloudinary;
