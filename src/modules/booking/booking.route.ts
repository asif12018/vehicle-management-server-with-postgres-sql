
import  express  from 'express';
import { bookingController } from './booking.controller';

const router = express.Router();


//create booking

router.post("/bookings", bookingController.createBooking);



export const bookingRoutes = router;
