import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import config from "../../config";

//register a user
const registerUser = async (payload: Record<string, unknown>) =>{
    const {name, email, password, phone, role} = payload;
    //encrypting the password
    const hashedPassword = await bcrypt.hash(password as string,10);
    const result = await pool.query(`
        INSERT INTO users(name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *
        `,[name, email, hashedPassword, phone, role]);
    return result;
}

//login a user
const loginUser = async(email: string, password: string)=>{ 
    const result = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `,[email]);
    if(result.rows.length === 0){
        return null;
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if(!match){
        return null;
    }

    //generating token after successfully signing
    const token = jwt.sign({name:user.name, email: user.email, phone:user.phone, role: user.role}, config.jwtSecret as string, {expiresIn: "1d"});

    return {token, user};
}


export const authServices = {
    registerUser,
    loginUser
}