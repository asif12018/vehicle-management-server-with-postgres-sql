
import express from "express";
import initDB from "./config/db";
import { authRoutes } from './modules/auth/auth.routes';

export  const app = express();


//parser

app.use(express.json());


//initializing database

initDB();

//register a user

app.use("/api/v1", authRoutes)