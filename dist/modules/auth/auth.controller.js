"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const auth_service_1 = require("./auth.service");
const registerUser = async (req, res) => {
    try {
        const result = await auth_service_1.authServices.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User register successfully...",
            data: result.rows[0]
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
//sign in a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await auth_service_1.authServices.loginUser(email, password);
        if (result === null) {
            res.status(500).json({
                success: false,
                message: 'invalid email or password'
            });
        }
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        });
    }
};
exports.authControllers = {
    registerUser,
    loginUser
};
