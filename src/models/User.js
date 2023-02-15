const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        _id: String,
        email: { type: String, unique: true, required: true },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
