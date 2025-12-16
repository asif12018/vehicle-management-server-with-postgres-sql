
import  express  from 'express';
import { bookingController } from './booking.controller';
import protectedRoute from '../../middleware/auth';

const router = express.Router();


//create booking

router.post("/bookings", protectedRoute('admin','customer'),bookingController.createBooking);



export const bookingRoutes = router;
