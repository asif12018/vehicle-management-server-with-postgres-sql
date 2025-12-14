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


export const vehicleController = {
    registerVehicles
}
