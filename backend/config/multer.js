import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure destination upload directories exist
const uploadDirs = ["uploads/foods", "uploads/users", "uploads/banners"];
uploadDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dest = "uploads/foods";
        if (req.originalUrl.includes("user")) dest = "uploads/users";
        if (req.originalUrl.includes("banner")) dest = "uploads/banners";
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Only image files (jpeg, jpg, png, webp) are allowed!"));
    }
};

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter
});
