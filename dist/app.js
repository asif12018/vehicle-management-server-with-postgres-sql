"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const auth_routes_1 = require("./modules/auth/auth.routes");
const user_routes_1 = require("./modules/user/user.routes");
const vehicle_route_1 = require("./modules/vehicles/vehicle.route");
const booking_route_1 = require("./modules/booking/booking.route");
exports.app = (0, express_1.default)();
//parser
exports.app.use(express_1.default.json());
//initializing database
(0, db_1.default)();
//register a user
exports.app.use("/api/v1", auth_routes_1.authRoutes);
//get all user
exports.app.use("/api/v1", user_routes_1.userRoutes);
//get single user
exports.app.use("/api/v1", user_routes_1.userRoutes);
//update user
exports.app.use("/api/v1", user_routes_1.userRoutes);
//delete user
exports.app.use("/api/v1", user_routes_1.userRoutes);
//register a vehicle
exports.app.use("/api/v1", vehicle_route_1.vehicleRoutes);
//get all vehicles
exports.app.use("/api/v1", vehicle_route_1.vehicleRoutes);
//get single vehicles
exports.app.use("/api/v1", vehicle_route_1.vehicleRoutes);
// update vehicle
exports.app.use("/api/v1", vehicle_route_1.vehicleRoutes);
//delete vehicle
exports.app.use("/api/v1", vehicle_route_1.vehicleRoutes);
//create a booking
exports.app.use("/api/v1", booking_route_1.bookingRoutes);
//get all booking
exports.app.use("/api/v1", booking_route_1.bookingRoutes);
//update booking
exports.app.use("/api/v1", booking_route_1.bookingRoutes);
//login a user
exports.app.use("/api/v1", auth_routes_1.authRoutes);
//not found routes
exports.app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "route not found",
        path: req.path,
    });
});
