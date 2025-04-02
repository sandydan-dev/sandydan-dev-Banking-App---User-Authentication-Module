const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      allowNull: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      allowNull: true,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      allowNull: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "employee"],
      default: "customer",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
