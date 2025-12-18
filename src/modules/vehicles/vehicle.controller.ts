import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";
import { checkIfBookingExists, updateExpiredBookings } from "../../config/helperFunction";

//register a vehicles

const registerVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.registerVehicle(req.body);

    //converting vehicle price into number
    const {id, vehicle_name, type, registration_number, daily_rent_price, availability_status} = result.rows[0];

    const vehicleRentPriceNumber = Number(daily_rent_price); 

    const vehicleData = {
      id, vehicle_name, type, registration_number, vehicleRentPriceNumber, availability_status
    }

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: vehicleData,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

//get all vehicles

const getVehicles = async (req: Request, res: Response) => {
  try {
    //checking the expired date of every booking
    const updateExpiredBooking = await updateExpiredBookings();
    const result = await vehicleService.getAllVehicles();
    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "No vehicles found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicles retrieved successfully",
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

//get single vehicles

const getSingleVehicles = async (req: Request, res: Response) => {
  try {
    //checking the expired date of every booking
    const updateExpiredBooking = await updateExpiredBookings();
    const { vehicleId } = req.params;
    const result = await vehicleService.getSingleVehicles(vehicleId as string);
    console.log(result.rows);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "No vehicle found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Vehicle retrieved successfully",
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

//update vehicle

const updateVehicle = async (req: Request, res: Response) => {
  try {
    //checking the expired date of every booking
    const updateExpiredBooking = await updateExpiredBookings();
    const result = await vehicleService.updateVehicle(
      req.body,
      req.params.vehicleId as string
    );

  

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    //converting vehicle price into number
    const {id, vehicle_name, type, registration_number, daily_rent_price, availability_status} = result.rows[0];

    const vehicleRentPriceNumber = Number(daily_rent_price); 

    const vehicleData = {
      id, vehicle_name, type, registration_number, vehicleRentPriceNumber, availability_status
    }

    return res.status(200).json({
      success: true,
      message: "Vehicle update successful",
      data: vehicleData,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

//delete vehicles

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    //checking the expired date of every booking
    const updateExpiredBooking = await updateExpiredBookings();
    //checking is booking exist for the booking
    const checkBooking = await checkIfBookingExists(req.params.vehicleId as string);
    if(checkBooking === true){
      return res.status(500).json({
        success: false,
        message:'delete failed due to active booking available for this vehicle'
      })
    }
    const result = await vehicleService.deleteVehicle(
      req.params.vehicleId as string
    );
    console.log(result.rowCount);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "vehicle not not found",
      });
    }

    res.status(200).json({
      success: false,
      message: "Vehicle deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
};

export const vehicleController = {
  registerVehicles,
  getVehicles,
  getSingleVehicles,
  updateVehicle,
  deleteVehicle,
};
