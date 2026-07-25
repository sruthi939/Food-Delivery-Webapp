import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
    try {
        const address = new Address({ userId: req.userId, ...req.body });
        await address.save();
        res.status(201).json({ success: true, message: "Address added", address });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({ userId: req.userId });
        res.json({ success: true, data: addresses });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
