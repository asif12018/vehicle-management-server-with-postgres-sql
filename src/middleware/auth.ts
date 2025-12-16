




import { NextFunction, Request, Response } from "express"
import config from "../config";
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
//role based authentication

const auth = (...roles: string[])=>{
    return async(req: Request, res: Response, next: NextFunction)=>{
        try{

        const token = req.headers.Authorization;
        if(!token){
            res.status(401).json({
                success: false,
                message: 'forbidden access',
            })
        }

        const decoded = jwt.verify(token as string, config.jwtSecret as string) as JwtPayload
        console.log('decoded data:', decoded);
        next();

        }catch(err: any){

        }
    }
}