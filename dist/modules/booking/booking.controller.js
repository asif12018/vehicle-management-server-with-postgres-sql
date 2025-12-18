"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const helperFunction_1 = require("../../config/helperFunction");
//create booking
const createBooking = async (req, res) => {
    try {
        const isUserExistData = await (0, helperFunction_1.isUserExist)(req.body.customer_id);
        const isVehicleExistData = await (0, helperFunction_1.isVehicleExist)(req.body.vehicle_id);
        //checking if the user is exist or not
        if (isUserExistData === false) {
            return res.status(404).json({
                success: false,
                message: 'User not exist!!'
            });
        }
        //checking if the vehicle is exist or not
        if (isVehicleExistData === false) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not exists'
            });
        }
        //checking the expired date of every booking
        const updateExpiredBooking = await (0, helperFunction_1.updateExpiredBookings)();
        const result = await booking_service_1.bookingService.createBooking(req.body);
        if (result.rows.length === 0) {
            return res.status(400).json({
                success: false,
                message: "The vehicle is already booked by another user",
            });
        }
        return res.status(201).json({
            success: true,
            message: "booking created successfully",
            data: result.rows[0],
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
//get all booking
const getAllBookings = async (req, res) => {
    try {
        const userData = await (0, helperFunction_1.getUserEmailAndRole)(req.headers.authorization);
        const result = await booking_service_1.bookingService.getAllBookings(userData.user.rows[0]);
        if (result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: "customer doesn't have any active booking",
                data: [],
            });
        }
        return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
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
//update booking
const updateBooking = async (req, res) => {
    try {
        //check booking date
        const bookingDate = await (0, helperFunction_1.checkBookingDate)(req.params.bookingId);
        if (bookingDate === false) {
            return res.status(404).json({
                success: false,
                message: "booking not exist",
            });
        }
        //check customer and admin status data and role
        const userData = await (0, helperFunction_1.getUserEmailAndRole)(req.headers.authorization);
        // console.log(userData.user.rows[0]);
        console.log(req.body.status);
        if (userData.user.rows[0].role === "customer" &&
            req.body.status !== "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Invalid input. Customer status data must be cancelled",
            });
        }
        if (userData.user.rows[0].role === "admin" &&
            req.body.status !== "returned") {
            return res.status(400).json({
                success: false,
                message: "Invalid input. Admin status data must be returned",
            });
        }
        // console.log(req.body.status.status);
        //for customer
        if (userData.user.rows[0].role === "customer") {
            //check todays date and booking date
            if (bookingDate <= new Date()) {
                return res.status(400).json({
                    success: false,
                    message: "Cannot cancel, booking already started!",
                });
            }
            //database operation
            const result = await booking_service_1.bookingService.updateBooking(userData.user.rows[0], req.params.bookingId, req.body.status);
            return res.status(201).json({
                success: true,
                message: "Booking cancelled successfully",
                data: result?.rows[0],
            });
        }
        //for admin
        if (userData.user.rows[0].role === "admin") {
            const result = await booking_service_1.bookingService.updateBooking(userData.user.rows[0], req.params.bookingId, req.body.status);
            if (result === null) {
                return res.status(400).json({
                    success: false,
                    message: "invalid booking id or booking not exist",
                });
            }
            return res.status(200).json({
                success: true,
                message: "Booking marked as returned. Vehicle is now available",
                data: result?.rows[0],
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            details: err,
        });
    }
};
exports.bookingController = {
    createBooking,
    getAllBookings,
    updateBooking,
};
