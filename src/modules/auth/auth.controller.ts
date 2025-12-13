import { Request , Response} from "express";
import { authServices } from "./auth.service";



const registerUser = async(req: Request, res: Response) =>{
    try{
       const result = await authServices.registerUser(req.body);
       res.status(201).json({
        success: true,
        message: "user register successfully...",
        data: result.rows[0]
       })
    }catch(err: any){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
};


export const authControllers = {
    registerUser
}