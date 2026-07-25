import Notification from "../models/Notification.js";

export const createNotification = async (userId, title, message) => {
    try {
        const notification = new Notification({ userId, title, message });
        await notification.save();
        return notification;
    } catch (error) {
        console.error("Create Notification Error:", error);
        return null;
    }
};
