"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const vehicle_service_1 = require("./vehicle.service");
const helperFunction_1 = require("../../config/helperFunction");
//register a vehicles
const registerVehicles = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.registerVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
//get all vehicles
const getVehicles = async (req, res) => {
    try {
        //checking the expired date of every booking
        const updateExpiredBooking = await (0, helperFunction_1.updateExpiredBookings)();
        const result = await vehicle_service_1.vehicleService.getAllVehicles();
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
//get single vehicles
const getSingleVehicles = async (req, res) => {
    try {
        //checking the expired date of every booking
        const updateExpiredBooking = await (0, helperFunction_1.updateExpiredBookings)();
        const { vehicleId } = req.params;
        const result = await vehicle_service_1.vehicleService.getSingleVehicles(vehicleId);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
//update vehicle
const updateVehicle = async (req, res) => {
    try {
        //checking the expired date of every booking
        const updateExpiredBooking = await (0, helperFunction_1.updateExpiredBookings)();
        const result = await vehicle_service_1.vehicleService.updateVehicle(req.body, req.params.vehicleId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "vehicle update successful",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
//delete vehicles
const deleteVehicle = async (req, res) => {
    try {
        //checking the expired date of every booking
        const updateExpiredBooking = await (0, helperFunction_1.updateExpiredBookings)();
        //checking is booking exist for the booking
        const checkBooking = await (0, helperFunction_1.checkIfBookingExists)(req.params.vehicleId);
        if (checkBooking === true) {
            return res.status(500).json({
                success: false,
                message: 'delete failed due to active booking available for this vehicle'
            });
        }
        const result = await vehicle_service_1.vehicleService.deleteVehicle(req.params.vehicleId);
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
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
exports.vehicleController = {
    registerVehicles,
    getVehicles,
    getSingleVehicles,
    updateVehicle,
    deleteVehicle,
};
