import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    image: String,
    role: { type: String, enum: ["owner", "premium", "user"], default: "user" },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);

//Tama ghare tate kehi maru nahanti?
