import express from 'express';
import { vehicleController } from './vehicle.controller';

const router = express.Router();



//register a vehicles
router.post("/vehicles", vehicleController.registerVehicles);

//get all vehicles

router.get("/vehicles", vehicleController.getVehicles);

//get single vehicles

router.get("/vehicles/:vehicleId", vehicleController.getSingleVehicles)


//update vehicles

router.put("/vehicles/:vehicleId", vehicleController.updateVehicle)


export const vehicleRoutes = router;