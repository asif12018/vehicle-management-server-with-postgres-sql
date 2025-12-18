"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingService = void 0;
const db_1 = require("../../config/db");
//create booking
const createBooking = async (payload) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    const bookingStatus = 'active';
    const result = await db_1.pool.query(`
    WITH new_booking AS (
      INSERT INTO bookings (
        customer_id, 
        vehicle_id, 
        rent_start_date, 
        rent_end_date, 
        total_price, 
        status
      )
      SELECT 
        $1, 
        $2, 
        $3, 
        $4, 
        (v.daily_rent_price * (($4::date - $3::date))), 
        $5
      FROM vehicles v 
      WHERE v.id = $2 AND v.availability_status = 'available'
      RETURNING *
    ),
    update_vehicle AS (
      UPDATE vehicles
      SET availability_status = 'booked'
      WHERE id = (SELECT vehicle_id FROM new_booking)
    )
    SELECT 
    nb.id,
    nb.vehicle_id,
    nb.rent_start_date,
    nb.rent_end_date,
    nb.total_price,
    nb.status,
    json_build_object(
     'vehicle_name', v.vehicle_name,
     'daily_rent_price','v.daily_rent_price'
    ) as vehicle
     FROM new_booking nb
     JOIN vehicles v ON nb.vehicle_id = v.id;
    `, [customer_id, vehicle_id, rent_start_date, rent_end_date, bookingStatus]);
    return result;
};
// get all bookings
const getAllBookings = async (payLoad) => {
    //user check
    if (payLoad.role === 'customer') {
        const result = await db_1.pool.query(`
        SELECT
        b.id,
        b.customer_id,
        b.vehicle_id,
        b.rent_start_date,
        b.rent_end_date,
        b.total_price,
        b.status,
        json_build_object(
        'vehicle_name', v.vehicle_name,
        'type', v.type
        ) AS vehicle
        FROM bookings b
        JOIN vehicles v ON b.vehicle_id = v.id
        WHERE b.customer_id = $1
        `, [payLoad.id]);
        return result;
    }
    // admin check
    const result = await db_1.pool.query(`
    SELECT
    b.id,
    b.customer_id,
    b.vehicle_id,
    b.rent_start_date,
    b.rent_end_date,
    b.total_price,
    b.status,
    json_build_object(
    'name', u.name,
    'email', u.email
    ) As customer,
     json_build_object(
     'vehicle_name', v.vehicle_name,
     'registration_number', v.registration_number
     'type', 'v.type'
     ) As vehicle
     FROM bookings b
     JOIN users u ON b.customer_id = u.id
     JOIN vehicles v ON b.vehicle_id = v.id
        `);
    return result;
};
// get vehicle by id
// const getSingleVehicles = async(id:string)=>{
//     const result = await pool.query(`
//         SELECT * FROM vehicles Where id = $1
//         `,[id]);
//     return result;
// }
// update a booking
const updateBooking = async (payLoad, bookingId, status) => {
    //for customer
    if (payLoad.role === 'customer') {
        const result = await db_1.pool.query(`
          UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *
          `, [status, bookingId]);
        return result;
    }
    //for admin
    if (payLoad.role === 'admin') {
        const updateBookingResult = await db_1.pool.query(`
         UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *
        `, [status, bookingId]);
        if (updateBookingResult.rows.length === 0) {
            return null;
        }
        if (status === 'returned') {
            await db_1.pool.query(`
            UPDATE vehicles
            SET availability_status='available'
            WHERE id=$1
            `, [updateBookingResult.rows[0].vehicle_id]);
        }
        return updateBookingResult;
    }
};
//delete a vehicles
// const deleteVehicle = async(id: string)=>{
//     const result = await pool.query(`
//         DELETE FROM vehicles WHERE id = $1
//         `,[id]);
//     return result
// }
exports.bookingService = {
    createBooking,
    getAllBookings,
    updateBooking
};
