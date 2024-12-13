import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;

    try {
        if (!email || !fullName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Input validation
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        // Check existing user
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        // Save user and generate token
        await newUser.save();
        generateToken(newUser._id, res);

        // Return user data
        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic
        });

    } catch (error) {
        console.log("Signup error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const login = (req, res) => {
    res.send("login route");
};

export const logout = (req, res) => {
    res.send("logout route");
};