import express from 'express';
import { userController } from './user.controller';





const router = express.Router();



router.get("/users", userController.getAllUsers);

router.get("/users/:userId",userController.getSingleUser);

router.put("/users/:userId", userController.updateUser);

export const userRoutes = router;