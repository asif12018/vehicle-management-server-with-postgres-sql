import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import {
  checkBookingDate,
  getUserEmailAndRole,
  updateExpiredBookings,
  isUserExist,
  isVehicleExist
} from "../../config/helperFunction";

//create booking

const createBooking = async (req: Request, res: Response) => {
  try {

    const isUserExistData = await isUserExist(req.body.customer_id);
    const isVehicleExistData = await isVehicleExist(req.body.vehicle_id);
    //checking if the user is exist or not
    if(isUserExistData === false){
      return res.status(404).json({
        success:false,
        message:'User not exist!!'
      })
    }

    //checking if the vehicle is exist or not

    if(isVehicleExistData === false){
      return res.status(404).json({
        success:false,
        message:'Vehicle not exists'
      })
    }

    //checking the expired date of every booking
    const updateExpiredBooking = await updateExpiredBookings();
    const result = await bookingService.createBooking(req.body);
    if (result.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The vehicle is already booked by another user",
      });
    }
    return res.status(201).json({
      success: true,
      message: "booking created successfully",
      data: result.rows[0],
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
const getAllBookings = async (req: Request, res: Response) => {
  try {
    const userData = await getUserEmailAndRole(
      req.headers.authorization as string
    );
    const result = await bookingService.getAllBookings(userData.user.rows[0]);
    if (result.rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "customer doesn't have any active booking",
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully",
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

//update booking

const updateBooking = async (req: Request, res: Response) => {
  try {
    //check booking date
    const bookingDate = await checkBookingDate(req.params.bookingId as string);
    if (bookingDate === false) {
      return res.status(404).json({
        success: false,
        message: "booking not exist",
      });
    }

    //check customer and admin status data and role
    const userData = await getUserEmailAndRole(
      req.headers.authorization as string
    );
    // console.log(userData.user.rows[0]);
    console.log(req.body.status);
    if (
      userData.user.rows[0].role === "customer" &&
      req.body.status !== "cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input. Customer status data must be cancelled",
      });
    }

    if (
      userData.user.rows[0].role === "admin" &&
      req.body.status !== "returned"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid input. Admin status data must be returned",
      });
    }

    // console.log(req.body.status.status);

    //for customer
    if (userData.user.rows[0].role === "customer") {
      //check todays date and booking date
      if (bookingDate <= new Date()) {
        return res.status(400).json({
          success: false,
          message: "Cannot cancel, booking already started!",
        });
      }
      //database operation
      const result = await bookingService.updateBooking(
        userData.user.rows[0],
        req.params.bookingId as string,
        req.body.status
      );

      return res.status(201).json({
        success: true,
        message: "Booking cancelled successfully",
        data: result?.rows[0],
      });
    }

    //for admin
    if (userData.user.rows[0].role === "admin") {
      const result = await bookingService.updateBooking(
        userData.user.rows[0],
        req.params.bookingId as string,
        req.body.status
      );
      if (result === null) {
        return res.status(400).json({
          success: false,
          message: "invalid booking id or booking not exist",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Booking marked as returned. Vehicle is now available",
        data: result?.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

export const bookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
};
