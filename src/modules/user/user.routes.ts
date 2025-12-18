import express from 'express';
import { userController } from './user.controller';
import protectedRoute from '../../middleware/auth';





const router = express.Router();



router.get("/users", protectedRoute('admin','customer'),userController.getAllUsers);

router.get("/users/:userId", protectedRoute('admin', 'customer'),userController.getSingleUser);

router.put("/users/:userId", protectedRoute('admin','customer'),userController.updateUser);

router.delete("/users/:userId", protectedRoute('admin'),userController.deleteUser);

export const userRoutes = router;