
import  express  from 'express';
import { bookingController } from './booking.controller';
import protectedRoute from '../../middleware/auth';

const router = express.Router();


//create booking

router.post("/bookings", protectedRoute('admin','customer'),bookingController.createBooking);
router.get("/bookings", bookingController.getAllBookings);



export const bookingRoutes = router;
