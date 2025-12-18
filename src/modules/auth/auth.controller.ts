import { Request , Response} from "express";
import { authServices } from "./auth.service";



const registerUser = async(req: Request, res: Response) =>{
    try{
       const result = await authServices.registerUser(req.body);
       return res.status(201).json({
         success: true,
        message: "User registered successfully",
        data: result.rows[0]
       })
    }catch(err: any){
        res.status(500).json({
            success:false,
            message: err.message
        })
    }
};

//sign in a user

const loginUser = async(req: Request, res: Response) =>{
    try{
      const {email, password} = req.body;
      const result = await authServices.loginUser(email, password);

    if(result === null){
        return res.status(500).json({
            success: false,
            message: 'invalid email or password'
        })
    }

    return res.status(200).json({
        success:true,
        message:"Login successful",
        data: result
    });
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message,
            details: err
        });
    }
}

export const authControllers = {
    registerUser,
    loginUser
}