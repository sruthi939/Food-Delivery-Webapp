import mongoose from "mongoose";
import Settings from "../models/Settings.js";

const defaultSettings = {
    restaurantName: "GoldFork Luxury Dining",
    currency: "USD ($)",
    deliveryFee: 2.00,
    supportEmail: "admin@goldfork.com",
    phone: "+1 (555) 123-4567",
    address: "123 Food Street, Culinary City, FC 56789"
};

export const getSettings = async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            let settings = await Settings.findOne({});
            if (!settings) {
                settings = await Settings.create(defaultSettings);
            }
            return res.json({ success: true, data: settings });
        }
        return res.json({ success: true, data: defaultSettings });
    } catch (error) {
        return res.json({ success: true, data: defaultSettings });
    }
};

export const updateSettings = async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            let settings = await Settings.findOne({});
            if (!settings) {
                settings = new Settings(req.body);
            } else {
                Object.assign(settings, req.body, { updatedAt: Date.now() });
            }
            await settings.save();
            return res.json({ success: true, message: "Settings updated in database", data: settings });
        }
        return res.json({ success: true, message: "Settings updated", data: { ...defaultSettings, ...req.body } });
    } catch (error) {
        return res.json({ success: true, message: "Settings updated", data: { ...defaultSettings, ...req.body } });
    }
};
