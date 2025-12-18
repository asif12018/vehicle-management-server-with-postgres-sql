"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleService = void 0;
const db_1 = require("../../config/db");
//create vehicles
const registerVehicle = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = payload;
    //encrypting the password
    const result = await db_1.pool.query(`
        INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
        `, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return result;
};
// get all vehicles
const getAllVehicles = async () => {
    const result = await db_1.pool.query(`
    SELECT * FROM vehicles
        `);
    return result;
};
// get vehicle by id
const getSingleVehicles = async (id) => {
    const result = await db_1.pool.query(`
        SELECT * FROM vehicles Where id = $1
        `, [id]);
    return result;
};
// update a vehicle
const updateVehicle = async (payload, id) => {
    const { vehicle_name, type, registration_number, daily_rent_price } = payload;
    const result = await db_1.pool.query(`
        UPDATE vehicles SET
        vehicle_name = COALESCE($1, vehicle_name),
        type = COALESCE($2, type),
        registration_number = COALESCE($3, registration_number),
        daily_rent_price = COALESCE($4, daily_rent_price),
        updated_at = NOW()
        WHERE id =$5
        RETURNING *
        `, [vehicle_name, type, registration_number, daily_rent_price, id]);
    return result;
};
//delete a vehicles
const deleteVehicle = async (id) => {
    const result = await db_1.pool.query(`
        DELETE FROM vehicles WHERE id = $1
        `, [id]);
    return result;
};
exports.vehicleService = {
    registerVehicle,
    getAllVehicles,
    getSingleVehicles,
    updateVehicle,
    deleteVehicle
};
