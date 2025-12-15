import { Request, Response } from "express";
import { bookingService } from "./booking.serivce";




//create booking 


const createBooking = async(req: Request, res: Response)=>{
    try{
        const result = await bookingService.createBooking(req.body);
        if(result.rows.length === 0){
            res.status(404).json({
                success: false,
                message: 'the vehicles is not available or the user not found'
            })
        }
        res.status(201).json({
            success: true,
            message:'booking created successfully',
            data:result.rows
        })
    }catch(err: any){
       res.status(500).json({
        success:false,
        message: err.message,
        details: err
       })
    }
}


export const bookingController = {
    createBooking
}