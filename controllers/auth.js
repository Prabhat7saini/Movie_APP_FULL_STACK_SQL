const { User } = require("../models");
const { sendSuccessResponse, sendErrorResponse } = require("../utils/sendResponseFunction");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(User, "authmiddleware");

        // Check if user exists
        //  SELECT * FROM Users WHERE email = 'email';
        const CheckUserPresent = await User.findOne({ where: { email } });

        if (CheckUserPresent) {
            return sendErrorResponse(res, 400, "User already exists");
        }

        // Hash the password
        const Hashedpassword = await bcrypt.hash(password, 10);

        // Create new User
        //INSERT INTO Users (name, email, password) VALUES ('name', 'email', 'hashedPassword');
        const user = await User.create({
            name,
            email,
            password: Hashedpassword,
        });

        return sendSuccessResponse(res, 202, "User created successfully");

    } catch (error) {
        console.log(error);
        return sendErrorResponse(res, 500, "User cannot be created");
    }
};

exports.login = async (req, res) => {
    try {
        console.log(User, "authmiddleware");

        const { email, password } = req.body;

        // Find user by email
        // SELECT * FROM Users WHERE email = 'email';
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return sendErrorResponse(res, 404, "User not found");
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const payload = {
                email: user.email,
                id: user.id,
            };

            // Generate JWT token
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '3h',
            });

            user.token = token;
            user.password = undefined;

            // Set token in cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            
            return res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User Login Success',
            });
        } else {
            return sendErrorResponse(res, 401, "Invalid password");
        }
    } catch (error) {
        console.error(error);
        return sendErrorResponse(res, 500, "Server error");
    }
};
