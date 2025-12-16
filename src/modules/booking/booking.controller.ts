import { Request, Response } from "express";
import { bookingService } from "./booking.serivce";
import {  getUserEmailAndRole, updateExpiredBookings } from "../../config/helperFunction";

//create booking

const createBooking = async (req: Request, res: Response) => {
  try {
    //checking the expired date of every booking
    const updateExpiredBooking = await updateExpiredBookings();
    const result = await bookingService.createBooking(req.body);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "the vehicles is not available or the user not found",
      });
    }
    res.status(201).json({
      success: true,
      message: "booking created successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};


//get all booking
const getAllBookings = async(req:Request, res:Response)=>{
  try{
      const userData = await getUserEmailAndRole(req.headers.authorization as string);
      const result = await bookingService.getAllBookings(userData.user.rows[0]);
      if(result.rows.length === 0){
           return res.status(200).json({
            success: true,
            message: "customer doesn't have any active booking",
            data:[]
           })
      }
      return res.status(200).json({
         success:true,
        message:"Bookings retrieved successfully",
        data:result.rows
      })
  }catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message,
      details:err
    })
  }
}

export const bookingController = {
  createBooking,
  getAllBookings
};
