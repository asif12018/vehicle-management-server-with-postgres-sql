
import express, { Request, Response } from "express";
import initDB from "./config/db";
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from "./modules/user/user.routes";
import { vehicleRoutes } from "./modules/vehicles/vehicle.route";
import { bookingRoutes } from "./modules/booking/booking.route";

export  const app = express();


//parser

app.use(express.json());


//initializing database

initDB();

//register a user

app.use("/api/v1", authRoutes);


//get all user

app.use("/api/v1", userRoutes);

//get single user

app.use("/api/v1", userRoutes);

//update user

app.use("/api/v1", userRoutes);

//delete user

app.use("/api/v1", userRoutes);

//register a vehicle

app.use("/api/v1", vehicleRoutes);

//get all vehicles

app.use("/api/v1", vehicleRoutes);

//get single vehicles

app.use("/api/v1", vehicleRoutes);

// update vehicle

app.use("/api/v1", vehicleRoutes);

//delete vehicle

app.use("/api/v1", vehicleRoutes);

//create a booking

app.use("/api/v1", bookingRoutes);

//get all booking

app.use("/api/v1", bookingRoutes);

//update booking
app.use("/api/v1", bookingRoutes);

//login a user

app.use("/api/v1", authRoutes);


//

app.get("/",(req:Request, res:Response)=>{
   res.status(200).json({
    success:true,
    message:'hello world'
   })
})



//not found routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "route not found",
    path: req.path,
  });
});