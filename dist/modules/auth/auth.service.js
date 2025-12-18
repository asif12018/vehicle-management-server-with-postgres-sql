"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
//register a user
const registerUser = async (payload) => {
    const { name, email, password, phone, role } = payload;
    //encrypting the password
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const result = await db_1.pool.query(`
        INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [name, email, hashedPassword, phone, role]);
    return result;
};
//login a user
const loginUser = async (email, password) => {
    const result = await db_1.pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email]);
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match) {
        return null;
    }
    //generating token after successfully signing
    const token = jsonwebtoken_1.default.sign({ name: user.name, email: user.email, phone: user.phone, role: user.role }, config_1.default.jwtSecret, { expiresIn: "1d" });
    return { token, user };
};
exports.authServices = {
    registerUser,
    loginUser
};
