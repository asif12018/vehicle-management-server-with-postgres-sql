"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("./vehicle.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
//register a vehicles
router.post("/vehicles", (0, auth_1.default)('admin'), vehicle_controller_1.vehicleController.registerVehicles);
//get all vehicles
router.get("/vehicles", vehicle_controller_1.vehicleController.getVehicles);
//get single vehicles
router.get("/vehicles/:vehicleId", vehicle_controller_1.vehicleController.getSingleVehicles);
//update vehicles
router.put("/vehicles/:vehicleId", (0, auth_1.default)('admin'), vehicle_controller_1.vehicleController.updateVehicle);
//delete vehicles
router.delete("/vehicles/:vehicleId", (0, auth_1.default)('admin'), vehicle_controller_1.vehicleController.deleteVehicle);
exports.vehicleRoutes = router;
