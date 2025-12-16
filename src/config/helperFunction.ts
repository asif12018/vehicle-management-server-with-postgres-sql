import { pool } from "./db";


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