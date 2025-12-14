import express from 'express';
import { vehicleController } from './vehicle.controller';

const router = express.Router();



//register a vehicles
router.post("/vehicles", vehicleController.registerVehicles);



export const vehicleRoutes = router;