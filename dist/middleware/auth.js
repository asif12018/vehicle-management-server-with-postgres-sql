"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//role based authentication
const protectedRoute = (...roles) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({
                    success: false,
                    message: "forbidden access",
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(401).json({
                    success: false,
                    message: "forbidden access",
                });
            }
            next();
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
                details: err,
            });
        }
    };
};
exports.default = protectedRoute;
