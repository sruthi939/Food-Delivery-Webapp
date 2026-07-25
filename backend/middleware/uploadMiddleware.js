import { upload } from "../config/multer.js";

export const uploadSingleImage = (fieldName) => upload.single(fieldName);
export const uploadMultipleImages = (fieldName, maxCount = 5) => upload.array(fieldName, maxCount);
