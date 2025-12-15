import { pool } from "./db"


//find car price



const findRentPrice = async(id: string) =>{
    const result = await pool.query(`
        SELECT * FROM vehicles WHERE id = $1
        `,[id]);
        
        return result.rows[0].daily_rent_price;
        
}


export default findRentPrice