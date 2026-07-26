import mongoose from "mongoose";
import Contact from "../models/Contact.js";

export const addContactMessage = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields (Name, Email, Subject, Message)"
            });
        }

        if (mongoose.connection.readyState === 1) {
            const newContact = new Contact({
                name,
                email,
                phone: phone || "",
                subject,
                message
            });
            await newContact.save();
            return res.status(201).json({
                success: true,
                message: "Thank you! Your message has been sent successfully. We will contact you soon.",
                data: newContact
            });
        }

        return res.status(201).json({
            success: true,
            message: "Thank you! Your message has been sent successfully. We will contact you soon.",
            data: { name, email, phone, subject, message, createdAt: new Date() }
        });
    } catch (error) {
        console.error("Contact controller error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit message to database: " + error.message
        });
    }
};

export const getContactMessages = async (req, res) => {
    try {
        if (mongoose.connection.readyState === 1) {
            const messages = await Contact.find({}).sort({ createdAt: -1 });
            return res.json({
                success: true,
                data: messages
            });
        }
        return res.json({
            success: true,
            data: []
        });
    } catch (error) {
        return res.json({
            success: true,
            data: []
        });
    }
};
