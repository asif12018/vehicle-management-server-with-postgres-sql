import express from "express";
import { vehicleController } from "./vehicle.controller";
import protectedRoute from "../../middleware/auth";

const router = express.Router();

//register a vehicles
router.post("/vehicles", protectedRoute('admin'),vehicleController.registerVehicles);

//get all vehicles

router.get("/vehicles", protectedRoute('admin', 'customer'),vehicleController.getVehicles);

//get single vehicles

router.get("/vehicles/:vehicleId", protectedRoute('admin','customer'),vehicleController.getSingleVehicles);

//update vehicles

router.put("/vehicles/:vehicleId", protectedRoute('admin'),vehicleController.updateVehicle);

//delete vehicles

router.delete("/vehicles/:vehicleId", vehicleController.deleteVehicle);

export const vehicleRoutes = router;
