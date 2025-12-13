
import express from "express";
import initDB from "./config/db";

export  const app = express();


//parser

app.use(express.json());


//initializing database

initDB();