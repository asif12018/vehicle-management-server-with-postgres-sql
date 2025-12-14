
import express from "express";
import initDB from "./config/db";
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from "./modules/user/user.routes";

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