import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./config/dbconnection.js";

// Configure ENV
dotenv.config();

//App config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB config
dbConnect();

//API routes
app.get("/getAllReminders", (req, res) => {});

app.post("/addReminder", (req, res) => {});

app.post("/deleteReminder", (req, res) => {});

app.get("/", (req, res) => {
  res.send("All set done");
});

// Port
const PORT = process.env.PORT || 8080;

// Run Listen
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} at PORT ${PORT}`);
});