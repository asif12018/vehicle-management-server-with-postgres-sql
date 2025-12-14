import express from 'express';
import { vehicleController } from './vehicle.controller';

const router = express.Router();



//register a vehicles
router.post("/vehicles", vehicleController.registerVehicles);

//get all vehicles

router.get("/vehicles", vehicleController.getVehicles);



export const vehicleRoutes = router;