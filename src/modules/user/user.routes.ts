import express from 'express';
import { userController } from './user.controller';





const router = express.Router();



router.get("/users", userController.getAllUsers);

router.get("/users/:userId",userController.getSingleUser);

router.put("/users/:userId", userController.updateUser);

router.delete("/users/:userId", userController.deleteUser);

export const userRoutes = router;