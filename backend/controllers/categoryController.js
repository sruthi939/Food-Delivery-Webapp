import Category from "../models/Category.js";
import { seedCategories } from "../seed/categoryData.js";

export const getCategories = async (req, res) => {
    try {
        let categories = await Category.find({});
        if (!categories || categories.length === 0) categories = seedCategories;
        res.json({ success: true, data: categories });
    } catch (error) {
        res.json({ success: true, data: seedCategories });
    }
};

export const addCategory = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json({ success: true, message: "Category added", data: category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
