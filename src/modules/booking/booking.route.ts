
import  express  from 'express';
import { bookingController } from './booking.controller';
import protectedRoute from '../../middleware/auth';

const router = express.Router();


//create booking

router.post("/bookings", protectedRoute('admin','customer'),bookingController.createBooking);

//get all bookings
router.get("/bookings", protectedRoute('admin','customer'),bookingController.getAllBookings);



export const bookingRoutes = router;
