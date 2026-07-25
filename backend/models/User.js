import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    cartData: { type: Object, default: {} },
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Food" }],
    avatar: { type: String, default: "" }
}, { minimize: false, timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
