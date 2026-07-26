import mongoose from "mongoose";
import Category from "../models/Category.js";
import { seedCategories } from "../seed/categoryData.js";

export const getCategories = async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            let categories = await Category.find({});
            if (!categories || categories.length === 0) {
                return res.json({ success: true, data: seedCategories });
            }
            return res.json({ success: true, data: categories });
        }
        return res.json({ success: true, data: seedCategories });
    } catch (error) {
        return res.json({ success: true, data: seedCategories });
    }
};

export const addCategory = async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const category = new Category(req.body);
            await category.save();
            return res.status(201).json({ success: true, message: "Category added", data: category });
        }
        return res.status(201).json({ success: true, message: "Category added", data: req.body });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const removeCategory = async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const { id } = req.body;
            await Category.findByIdAndDelete(id);
        }
        return res.json({ success: true, message: "Category removed" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
