import foodModel from "../models/foodModel.js";
import fs from "fs";

// Seed fallback data if DB is offline or empty
const initialFoods = [
    {
        _id: "1",
        name: "Greek salad",
        price: 12,
        description: "Fresh veggies, olives & feta cheese.",
        category: "Salad",
        image: "food_1.png"
    },
    {
        _id: "2",
        name: "Veg salad",
        price: 18,
        description: "Fresh vegetables with herb dressing.",
        category: "Salad",
        image: "food_2.png"
    },
    {
        _id: "3",
        name: "Clover Salad",
        price: 16,
        description: "Greens, walnuts & cheese.",
        category: "Salad",
        image: "food_3.png"
    },
    {
        _id: "4",
        name: "Chicken Salad",
        price: 24,
        description: "Grilled chicken with fresh veggies.",
        category: "Salad",
        image: "food_4.png"
    },
    {
        _id: "5",
        name: "Lasagna Rolls",
        price: 14,
        description: "Cheesy rolls with tomato sauce.",
        category: "Rolls",
        image: "food_5.png"
    },
    {
        _id: "6",
        name: "Peri Peri Rolls",
        price: 12,
        description: "Spicy chicken tortilla roll.",
        category: "Rolls",
        image: "food_6.png"
    },
    {
        _id: "7",
        name: "Chicken Rolls",
        price: 20,
        description: "Chicken roll with veggies.",
        category: "Rolls",
        image: "food_7.png"
    },
    {
        _id: "8",
        name: "Veg Rolls",
        price: 15,
        description: "Fresh veggie wraps.",
        category: "Rolls",
        image: "food_8.png"
    }
];

// Add Food Item
export const addFood = async (req, res) => {
    try {
        const image_filename = req.file ? req.file.filename : "default.png";

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            category: req.body.category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "Food Added Successfully" });
    } catch (error) {
        console.error("Add Food Error:", error);
        res.status(500).json({ success: false, message: "Error adding food item" });
    }
};

// List All Foods
export const listFood = async (req, res) => {
    try {
        let foods = [];
        try {
            foods = await foodModel.find({});
        } catch (dbErr) {
            foods = initialFoods;
        }

        if (!foods || foods.length === 0) {
            foods = initialFoods;
        }

        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("List Food Error:", error);
        res.json({ success: true, data: initialFoods });
    }
};

// Remove Food Item
export const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (food && food.image) {
            fs.unlink(`uploads/${food.image}`, () => { });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed Successfully" });
    } catch (error) {
        console.error("Remove Food Error:", error);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};
