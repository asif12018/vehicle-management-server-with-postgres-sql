import { pool } from "../../config/db";

//get all user
const getAllUsers = async () => {
  const result = await pool.query(`
    SELECT * FROM users
        `);
    return result;
};

//get user by id
const getSingleUser = async(id:string)=>{
    const result = await pool.query(`
        SELECT * FROM users Where id = $1
        `,[id]);
    return result;
}

export const userService = {
    getAllUsers,
    getSingleUser
}
