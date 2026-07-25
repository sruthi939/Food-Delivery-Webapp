import Food from "../models/Food.js";
import { seedFoods } from "../seed/foodData.js";

export const getFoods = async (req, res) => {
    try {
        let foods = await Food.find({});
        if (!foods || foods.length === 0) foods = seedFoods;
        res.json({ success: true, data: foods });
    } catch (error) {
        res.json({ success: true, data: seedFoods });
    }
};

export const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) return res.status(404).json({ success: false, message: "Food item not found" });
        res.json({ success: true, data: food });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const addFood = async (req, res) => {
    try {
        const image = req.file ? req.file.filename : "food_1.png";
        const food = new Food({ ...req.body, price: Number(req.body.price), image });
        await food.save();
        res.status(201).json({ success: true, message: "Food added", data: food });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const removeFood = async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.body.id || req.params.id);
        res.json({ success: true, message: "Food removed successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
