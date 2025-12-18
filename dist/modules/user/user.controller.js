"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const helperFunction_1 = require("../../config/helperFunction");
//get all user
const getAllUsers = async (req, res) => {
    try {
        const result = await user_service_1.userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieve successfully",
            data: result.rows,
        });
    }
    catch (err) { }
};
// get a single user
const getSingleUser = async (req, res) => {
    try {
        const result = await user_service_1.userService.getSingleUser(req.params.userId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User retrieve successfully",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
//update user
const updateUser = async (req, res) => {
    try {
        //get user data from headers
        const userData = await (0, helperFunction_1.getUserEmailAndRole)(req.headers.authorization);
        //filtering user update data role
        if (userData.user.rows[0].role === 'customer' && req.body.role) {
            return res.status(400).json({
                success: false,
                message: 'User cant update it own role'
            });
        }
        const result = await user_service_1.userService.updateUser(req.body, req.params.userId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
//delete a user
const deleteUser = async (req, res) => {
    try {
        const result = await user_service_1.userService.deleteUser(req.params.userId);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: 'user not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    }
    catch (err) {
        res.status(500).json({
            success: true,
            message: err.message,
            details: err,
        });
    }
};
exports.userController = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
