const { User } = require("../model/userAuth.model");
const { generateToken } = require("../middleware/jwt.middleware");
const bcrypt = require("bcryptjs");
const { sendMail } = require("../hepler/mailer");

// signup
const createUserAuth = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // 2. Send a welcome/verification email using Nodemailer
    const subject = "Welcome to Our Bank!";
    const text = `Hi ${username},\n\nThank you for registering! We're excited to server you our services.\n\n- The Team`;

    await sendMail(email, subject, text);

    const saveUserData = await newUser.save();

    return res
      .status(201)
      .json({ message: "User create successully", saveUserData });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error while creating new user", error });
  }
};

// signin/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists in database
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      return res
        .status(404)
        .json({ message: "Email is not registered. signup first" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    // Set token in response header
    res.setHeader("Authorization", `Bearer ${token}`);

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    return res.status(500).json({ message: "Login failed", error });
  }
};

// all users
const allUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (users.length === 0) {
      return res.status(404).json({ message: "Users not found" });
    }

    return res.status(200).json({
      message: "Registered Users",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while fetching registered users",
      error,
    });
  }
};

// get role customer only
const registeredUserDetails = async (req, res) => {
  try {
    const userRole = req.params.role || req.user.role; // Use role from params or user's role
    const registeredUser = await User.find({ role: userRole });

    if (registeredUser.length === 0) {
      return res
        .status(404)
        .json({ message: `No user found for the role ${userRole}` });
    }

    return res
      .status(200)
      .json({ message: `Role ${userRole} lists`, registeredUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while fetching role based data", error });
  }
};

// update user details
const updateUserDetailsById = async (req, res) => {
  try {
    const id = req.params.id;
    const updateFields = req.body;

    // Check if user exists
    const userExists = await User.findById(id);
    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check if email is being updated and is unique
    if (updateFields.email && updateFields.email !== userExists.email) {
      const emailExists = await User.findOne({
        email: updateFields.email,
        _id: { $ne: id },
      });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: "Email already in use by another user",
        });
      }
    }

    // Hash password if it's being updated
    if (updateFields.password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(updateFields.password, salt);
    }

    // Update user with all provided fields
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password");

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while updating user",
      error: error.message || "Unknown error occurred",
    });
  }
};

// get data by id
const getUserDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.findById(id);

    if (!users) {
      return res
        .status(404)
        .json({ message: "Registered User not found registered first.." });
    }

    return res.status(200).json({ message: "Registered User Details", users });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while fetching registered user details", errro });
  }
};

// delete user by id
const userDeleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id, { isActive: false });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while deleting user", error });
  }
};

module.exports = {
  createUserAuth,
  login,
  allUsers,
  registeredUserDetails,
  updateUserDetailsById,
  getUserDataById,
  userDeleteById,
};
