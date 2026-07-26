import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
    restaurantName: { type: String, default: "GoldFork Luxury Dining" },
    currency: { type: String, default: "USD ($)" },
    deliveryFee: { type: Number, default: 2.00 },
    supportEmail: { type: String, default: "admin@goldfork.com" },
    phone: { type: String, default: "+1 (555) 123-4567" },
    address: { type: String, default: "123 Food Street, Culinary City, FC 56789" },
    updatedAt: { type: Date, default: Date.now }
});

const Settings = mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;
