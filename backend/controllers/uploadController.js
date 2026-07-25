export const uploadFile = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
        res.json({
            success: true,
            message: "File uploaded successfully",
            filename: req.file.filename,
            path: `/api/images/${req.file.filename}`
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
