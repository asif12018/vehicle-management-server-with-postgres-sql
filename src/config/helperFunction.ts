import { pool } from "./db";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from './index';

export const updateExpiredBookings = async () => {
  const result = await pool.query(`
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


//check if a booking exist

export const checkIfBookingExists = async(id:string)=>{
  const result = await pool.query(`
    SELECT * FROM bookings WHERE vehicle_id = $1
    `,[id]);

    if(result.rows.length === 0){
        return false
    }

    return true
}


//get user id and role

export const getUserEmailAndRole = async(token: string)=>{
  const decode = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload;
  const user = await pool.query(`
    SELECT * FROM users WHERE email = $1
    `,[decode.email])
  return {user};
}

//check booking date

//check booking date
export const checkBookingDate = async (bookingId: string) => {
  
  const bookingData = await pool.query(
    `SELECT rent_start_date FROM bookings WHERE id = $1`,
    [bookingId]
  );

  if (bookingData.rows.length === 0) {
     return false

  }

  return new Date(bookingData.rows[0].rent_start_date);
};