
import  express  from 'express';
import { authControllers } from './auth.controller';


const router = express.Router();

router.post("/auth/signup", authControllers.registerUser);

router.post("/auth/signin", authControllers.loginUser);

export const authRoutes = router;