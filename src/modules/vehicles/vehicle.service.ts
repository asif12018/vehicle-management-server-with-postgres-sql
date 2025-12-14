import { pool } from "../../config/db";

//create vehicles
const registerVehicle = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  //encrypting the password
  const result = await pool.query(
    `
        INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *
        `,
    [vehicle_name, type, registration_number, daily_rent_price, availability_status]
  );
  return result;
};

//get all user
// const getAllUsers = async () => {
//   const result = await pool.query(`
//     SELECT * FROM users
//         `);
//     return result;
// };

//get user by id
// const getSingleUser = async(id:string)=>{
//     const result = await pool.query(`
//         SELECT * FROM users Where id = $1
//         `,[id]);
//     return result;
// }

// update a user

// const updateUser = async(payload: Record<string, unknown>,id:string)=>{
//     const {name, email, phone, role} = payload;
//     const result = await pool.query(`
//         UPDATE users SET
//         name = COALESCE($1, name),
//         email = COALESCE($2, email),
//         phone = COALESCE($3, phone),
//         role = COALESCE($4, role),
//         updated_at = NOW()
//         WHERE id =$5
//         RETURNING *
//         `,[name, email, phone, role, id]);
//         return result;
// }

//delete a user

// const deleteUser = async(id: string)=>{
//     const result = await pool.query(`
//         DELETE FROM users WHERE id = $1
//         `,[id]);
//     return result
// }

export const vehicleService = {
    registerVehicle
}
