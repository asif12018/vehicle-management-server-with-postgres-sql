import express from "express";
import { vehicleController } from "./vehicle.controller";
import protectedRoute from "../../middleware/auth";

const router = express.Router();

//register a vehicles
router.post("/vehicles", protectedRoute('admin'),vehicleController.registerVehicles);

//get all vehicles

router.get("/vehicles", vehicleController.getVehicles);

//get single vehicles

router.get("/vehicles/:vehicleId",vehicleController.getSingleVehicles);

//update vehicles

router.put("/vehicles/:vehicleId", protectedRoute('admin'),vehicleController.updateVehicle);

//delete vehicles

router.delete("/vehicles/:vehicleId", protectedRoute('admin'),vehicleController.deleteVehicle);

export const vehicleRoutes = router;
