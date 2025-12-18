"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = require("../../config/db");
//get all user
const getAllUsers = async () => {
    const result = await db_1.pool.query(`
    SELECT * FROM users
        `);
    return result;
};
//get user by id
const getSingleUser = async (id) => {
    const result = await db_1.pool.query(`
        SELECT * FROM users Where id = $1
        `, [id]);
    return result;
};
// update a user
const updateUser = async (payload, id) => {
    const { name, email, phone, role } = payload;
    const result = await db_1.pool.query(`
        UPDATE users SET 
        name = COALESCE($1, name),
        email = COALESCE($2, email),
        phone = COALESCE($3, phone),
        role = COALESCE($4, role),
        updated_at = NOW()
        WHERE id =$5
        RETURNING *
        `, [name, email, phone, role, id]);
    return result;
};
//delete a user
const deleteUser = async (id) => {
    const result = await db_1.pool.query(`
        DELETE FROM users WHERE id = $1
        `, [id]);
    return result;
};
exports.userService = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
};
