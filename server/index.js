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
app.get("/getAllReminders", async (req, res) => {
  try {
    const reminderList = await Reminder.find({});
    res.send(reminderList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addReminder", async (req, res) => {
  try {
    const { reminderMsg, remindAt } = req.body;
    const reminder = new Reminder({
      reminderMsg,
      remindAt,
      isReminded: false,
    });

    await reminder.save();
    const reminderList = await Reminder.find({});
    res.send(reminderList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/deleteReminder", async (req, res) => {
  try {
    const { id } = req.body;
    await Reminder.deleteOne({ _id: id });
    const reminderList = await Reminder.find({});
    res.send(reminderList);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Port
const PORT = process.env.PORT || 8080;

// Run Listen
app.listen(PORT, () => {
  console.log(`Server is running on ${process.env.DEV_MODE} at PORT ${PORT}`);
});
