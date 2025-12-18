"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
//create booking
router.post("/bookings", (0, auth_1.default)('admin', 'customer'), booking_controller_1.bookingController.createBooking);
//get all bookings
router.get("/bookings", (0, auth_1.default)('admin', 'customer'), booking_controller_1.bookingController.getAllBookings);
//update booking
router.put("/bookings/:bookingId", (0, auth_1.default)('admin', 'customer'), booking_controller_1.bookingController.updateBooking);
exports.bookingRoutes = router;
