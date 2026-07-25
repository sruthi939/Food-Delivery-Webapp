import Coupon from "../models/Coupon.js";
import { seedCoupons } from "../seed/couponData.js";

export const validateCoupon = async (req, res) => {
    try {
        const { code, amount } = req.body;
        let coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
        if (!coupon) {
            coupon = seedCoupons.find(c => c.code === code.toUpperCase());
        }
        if (!coupon) return res.status(404).json({ success: false, message: "Invalid or expired coupon code" });

        if (amount < coupon.minOrderAmount) {
            return res.status(400).json({ success: false, message: `Minimum order amount of $${coupon.minOrderAmount} required` });
        }

        const discount = (amount * coupon.discountPercentage) / 100;
        res.json({ success: true, message: "Coupon applied", discountPercentage: coupon.discountPercentage, discountAmount: discount });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
