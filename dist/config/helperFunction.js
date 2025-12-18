"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVehicleExist = exports.isUserExist = exports.checkBookingDate = exports.getUserEmailAndRole = exports.checkIfBookingExists = exports.updateExpiredBookings = void 0;
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("./index"));
const updateExpiredBookings = async () => {
    const result = await db_1.pool.query(`
    WITH expired_bookings AS (
      UPDATE bookings
      SET status = 'returned'
      WHERE status = 'active' AND rent_end_date < NOW()
      RETURNING vehicle_id
    ),
    update_vehicles AS (
      UPDATE vehicles
      SET availability_status = 'available'
      WHERE id IN (SELECT vehicle_id FROM expired_bookings)
    )
    SELECT * FROM expired_bookings;
  `);
};
exports.updateExpiredBookings = updateExpiredBookings;
//check if a booking exist
const checkIfBookingExists = async (id) => {
    const result = await db_1.pool.query(`
    SELECT * FROM bookings WHERE vehicle_id = $1
    `, [id]);
    if (result.rows.length === 0) {
        return false;
    }
    return true;
};
exports.checkIfBookingExists = checkIfBookingExists;
//get user id and role
const getUserEmailAndRole = async (token) => {
    const decode = jsonwebtoken_1.default.verify(token, index_1.default.jwtSecret);
    const user = await db_1.pool.query(`
    SELECT * FROM users WHERE email = $1
    `, [decode.email]);
    return { user };
};
exports.getUserEmailAndRole = getUserEmailAndRole;
//check booking date
//check booking date
const checkBookingDate = async (bookingId) => {
    const bookingData = await db_1.pool.query(`SELECT rent_start_date FROM bookings WHERE id = $1`, [bookingId]);
    if (bookingData.rows.length === 0) {
        return false;
    }
    return new Date(bookingData.rows[0].rent_start_date);
};
exports.checkBookingDate = checkBookingDate;
//is user exist
const isUserExist = async (id) => {
    const result = await db_1.pool.query(`
    SELECT * FROM users WHERE id=$1
    `, [id]);
    if (result.rows.length === 0) {
        return false;
    }
    return true;
};
exports.isUserExist = isUserExist;
//is vehicle exist
const isVehicleExist = async (id) => {
    const result = await db_1.pool.query(`
    SELECT * FROM vehicles WHERE id=$1
    `, [id]);
    if (result.rows.length === 0) {
        return false;
    }
    return true;
};
exports.isVehicleExist = isVehicleExist;
