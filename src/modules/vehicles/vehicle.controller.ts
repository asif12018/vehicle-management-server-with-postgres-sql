import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

//register a vehicles

const registerVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleService.registerVehicle(req.body);

    res.status(201).json({
      success: true,
      message: "vehicles created successfully",
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

//get all vehicles

const getVehicles = async (req: Request, res: Response) => {
  try {
    
    const result = await vehicleService.getAllVehicles();
    res.status(200).json({
      success: true,
      message: "vehicles retrieved successfully",
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
    const {vehicleId} = req.params
    const result = await vehicleService.getSingleVehicles(vehicleId as string);
    console.log(result.rows)
    if(result.rows.length === 0){
        res.status(404).json({
            success: false,
            message: 'vehicles not found',
            data: null,
        })
    }
    res.status(200).json({
        success: true,
        message: 'vehicles retrieved successfully',
        data: result.rows
    })
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
  getSingleVehicles
};
